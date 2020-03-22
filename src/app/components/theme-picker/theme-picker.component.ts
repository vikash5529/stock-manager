import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StyleManagerService } from 'src/app/services/style-manager.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {
  public isThemeLight = true;
  public isThemeDark = false;

  constructor(private styleManagerService: StyleManagerService) {}

  toggleTheme(event: MatSlideToggleChange) {
    const themeName = event.checked ? 'pink-bluegrey' : 'indigo-pink';
    this.isThemeLight = !event.checked;
    this.isThemeDark = event.checked;
    this.styleManagerService.setStyle(`assets/custom-theme/${themeName}.css`, event.checked);
  }
}
