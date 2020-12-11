import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(
    readonly sanitizer: DomSanitizer
  ) {
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}
