import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges {

  srcVideo = 'assers/back2.mp4'
  bannerTitle : string = "Mission: Impossible - Dead Reckoning Part One";
  bannerOverview : string = `Ethan Hunt and the IMF team must track down a terrifying new weapon
    that threatens all of humanity if it falls into the wrong hands. With control of the future and
    the fate of the world at stake, a deadly race around the globe begins. Confronted by a mysterious,
    all-powerful enemy, Ethan is forced to consider that nothing can matter more than the mission --
    not even the lives of those he cares about most.`;
  
  private sanitizer = inject(DomSanitizer);
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/avz06PDqDbM?si=6-PwIORltwioJthy`)
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/avz06PDqDbM?si=6-PwIORltwioJthy`);
    }
  }

  
  extractVideoId(url: string): string {
    const match = url.match(/embed\/([^\?&]+)/);
    return match ? match[1] : '';
  }

}


