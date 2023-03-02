import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLang: string

  constructor(public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang)
   }

  ngOnInit(): void {
  }
  changeCurrentLang(lang:string){
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr"
    htmlTag.lang = lang === "ar" ? "ar" : "en"
    this.translate.setDefaultLang(lang)
    this.ChangeCSSFile(lang)
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang)
  }

  ChangeCSSFile(lang: string){
    let HeadTag = this.document.getElementsByTagName('head')[0] as HTMLHeadElement
    let existingLink = this.document.getElementById('langCSS') as HTMLLinkElement
    let bundlename = lang === "ar" ? "arabicCSS.css" : "englishCSS.css"
    if(existingLink){
      existingLink.href = bundlename;
    }else{
      let newlink = this.document.createElement('link')
      newlink.rel = 'stylesheet';
      newlink.type = 'text/css';
      newlink.id = 'lang/CSS'
      newlink.href = bundlename
      HeadTag.appendChild(newlink)
    }
  }

}
