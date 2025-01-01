import { Component, Inject } from '@angular/core';
import { WorldBankService } from '../world-bank.service';
import { CountryData } from '../country-data';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: [WorldBankService]
})

export class MapComponent {
  countryName = 'Click on a country to see information :)';
  countryCapital = '';
  countryRegion = '';
  countryIncomeLevel = '';
  countryLongitude = '';
  countryLatitude = '';
  countryCode: string = '';
  errorMessage: string = '';
  countryData: CountryData[] = [];

  constructor(@Inject(WorldBankService) private worldBankService: WorldBankService) {}

  onClick(event: MouseEvent) {
    const clickedPath = event.target as SVGPathElement;
    this.countryCode = clickedPath.id;
    console.log('Clicked country code:', this.countryCode);

    this.worldBankService.getWorldBankInfo(this.countryCode).subscribe({
      next: (response: any[]) => {
        console.log('Full API response:', response);
        if (response && response.length > 1 && Array.isArray(response[1])) {
          const countryData = response[1][0];
          console.log('Country data:', countryData);
          if (countryData) {
            this.countryName = 'Country: ' + (countryData.name || 'N/A');
            this.countryCapital = 'Capital: ' + (countryData.capitalCity || 'N/A');
            this.countryRegion = 'Region: ' + (countryData.region?.value || 'N/A');
            this.countryIncomeLevel = 'Income Level: ' + (countryData.incomeLevel?.value || 'N/A');
            this.countryLongitude = 'Longitude: ' + (countryData.longitude || 'N/A');
            this.countryLatitude = 'Latitude: ' + (countryData.latitude || 'N/A');
          } else {
            console.error('Country data is undefined');
            this.resetCountryInfo();
          }
        } else {
          console.error('No country data received or empty array');
          this.resetCountryInfo();
        }
      },
      error: err => {
        this.errorMessage = err;
        console.error('Error fetching country data:', err);
        this.resetCountryInfo();
      }
    });
  }



  private resetCountryInfo() {
    this.countryName = 'Country information not available';
    this.countryCapital = '';
    this.countryRegion = '';
    this.countryIncomeLevel = '';
    this.countryLongitude = '';
    this.countryLatitude = '';
  }  
}
