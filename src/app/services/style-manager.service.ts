import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StoreService } from './store.service';
@Injectable({ providedIn: 'root' })
export class StyleManagerService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private storeService: StoreService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public setStyle(href: string, isdark: boolean): void {
    this.storeService.isCurrentThemeDark = isdark;
    const element = this.document.getElementById('themeAsset');
    this.renderer.setAttribute(element, 'href', href);
  }
}
