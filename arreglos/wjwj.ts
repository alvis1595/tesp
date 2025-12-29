
+ npm config fix

The following configuration problems have been repaired:



~ `_auth` renamed to `//bgxpa.jfrog.io/artifactory/api/npm/norte-npm/:_auth` in user config

+ npm install -g @angular/cli



changed 268 packages in 21s



51 packages are looking for funding

  run `npm fund` for details

+ npm install

npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported

npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported



added 976 packages, and audited 977 packages in 25s



162 packages are looking for funding

  run `npm fund` for details



22 vulnerabilities (6 low, 6 moderate, 10 high)



To address issues that do not require attention, run:

  npm audit fix



Some issues need review, and may require choosing

a different dependency.



Run `npm audit` for details.

+ ng build --configuration=development

��� Building...

��� Building...

Application bundle generation failed. [10.299 seconds]



��� [WARNING] NG8107: The left side of this optional chain operation does not include 'null' or 'undefined' in its type, therefore the '?.' operator can be replaced with the '.' operator. [plugin angular-compiler]



    src/app/feature/DespliegueCd/pages/liberacion/modal/modal.component.html:30:19:

      30 ���         <p>{{data?.children?.[0]?.JustificacionDelNegocio}}</p>

         ���                    ~~~~~~~~



  Error occurs in the template of component ModalComponent.



    src/app/feature/DespliegueCd/pages/liberacion/modal/modal.component.ts:55:15:

      55 ���   templateUrl: './modal.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] NG9: Property 'setIndexModal' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.html:41:20:

      41 ���       (indexModal)="setIndexModal($event)"

         ���                     ~~~~~~~~~~~~~



  Error occurs in the template of component ListadoDeCambiosComponent.



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:25:15:

      25 ���   templateUrl: './listado-de-cambios.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] NG9: Property 'getUrl' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.html:63:19:

      63 ���         <a [href]="getUrl(index.children[0].enlaceJfrog)">

         ���                    ~~~~~~



  Error occurs in the template of component ListadoDeCambiosComponent.



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:25:15:

      25 ���   templateUrl: './listado-de-cambios.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] NG9: Property 'showModal' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.html:73:21:

      73 ���             (click)="showModal('upFile')"

         ���                      ~~~~~~~~~



  Error occurs in the template of component ListadoDeCambiosComponent.



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:25:15:

      25 ���   templateUrl: './listado-de-cambios.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] NG9: Property 'showModal' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.html:82:21:

      82 ���             (click)="showModal('listFiles')"

         ���                      ~~~~~~~~~



  Error occurs in the template of component ListadoDeCambiosComponent.



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:25:15:

      25 ���   templateUrl: './listado-de-cambios.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] NG9: Property 'handleCancel' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.html:98:16:

      98 ���   (nzOnCancel)="handleCancel()"

         ���                 ~~~~~~~~~~~~



  Error occurs in the template of component ListadoDeCambiosComponent.



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:25:15:

      25 ���   templateUrl: './listado-de-cambios.component.html',

         ���                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





��� [ERROR] TS2339: Property 'getFormattedDate' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:246:41:

      246 ���     const todayWithoutFormat: any = this.getFormattedDate();

          ���                                          ~~~~~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:391:2:

      391 ���   getFormattedDate = (): string { //quitamos el =>

          ���   ~~~~~~~~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'getFormattedDate'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:391:2:

      391 ���   getFormattedDate = (): string { //quitamos el =>

          ���   ~~~~~~~~~~~~~~~~





��� [ERROR] TS1005: '=>' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:391:32:

      391 ���   getFormattedDate = (): string { //quitamos el =>

          ���                                 ^





��� [ERROR] TS1005: ')' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:406:3:

      406 ���   };

          ���    ^





��� [ERROR] TS2304: Cannot find name 'setIndexModal'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:408:2:

      408 ���   setIndexModal(index: any) {

          ���   ~~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:408:21:

      408 ���   setIndexModal(index: any) {

          ���                      ^





��� [ERROR] TS2693: 'any' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:408:23:

      408 ���   setIndexModal(index: any) {

          ���                        ~~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:408:28:

      408 ���   setIndexModal(index: any) {

          ���                             ^





��� [ERROR] TS2339: Property 'getElements' does not exist on type 'ListadoDeCambiosComponent'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:410:9:

      410 ���     this.getElements(index.children[0].Elementos);

          ���          ~~~~~~~~~~~





��� [ERROR] TS2339: Property 'children' does not exist on type 'number'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:410:27:

      410 ���     this.getElements(index.children[0].Elementos);

          ���                            ~~~~~~~~





��� [ERROR] TS2552: Cannot find name 'getElements'. Did you mean 'SVGSetElement'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:413:2:

      413 ���   getElements(elements: string) {

          ���   ~~~~~~~~~~~



  'SVGSetElement' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:21198:12:

      21198 ��� declare var SVGSetElement: {

            ���             ~~~~~~~~~~~~~





��� [ERROR] TS2552: Cannot find name 'elements'. Did you mean 'Element'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:413:14:

      413 ���   getElements(elements: string) {

          ���               ~~~~~~~~



  'Element' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:8334:12:

      8334 ��� declare var Element: {

           ���             ~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:413:22:

      413 ���   getElements(elements: string) {

          ���                       ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:413:24:

      413 ���   getElements(elements: string) {

          ���                         ~~~~~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:413:32:

      413 ���   getElements(elements: string) {

          ���                                 ^





��� [ERROR] TS2552: Cannot find name 'elements'. Did you mean 'Element'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:414:42:

      414 ���     const listas = setElementListJfrogCrq(elements);

          ���                                           ~~~~~~~~



  'Element' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:8334:12:

      8334 ��� declare var Element: {

           ���             ~~~~~~~





��� [ERROR] TS2304: Cannot find name 'getUrl'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:419:2:

      419 ���   getUrl(html: string) {

          ���   ~~~~~~





��� [ERROR] TS2304: Cannot find name 'html'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:419:9:

      419 ���   getUrl(html: string) {

          ���          ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:419:13:

      419 ���   getUrl(html: string) {

          ���              ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:419:15:

      419 ���   getUrl(html: string) {

          ���                ~~~~~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:419:23:

      419 ���   getUrl(html: string) {

          ���                        ^





��� [ERROR] TS2304: Cannot find name 'html'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:420:23:

      420 ���     return getUrlFromA(html);

          ���                        ~~~~





��� [ERROR] TS2304: Cannot find name 'handleCancel'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:423:2:

      423 ���   handleCancel(): void {

          ���   ~~~~~~~~~~~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:423:16:

      423 ���   handleCancel(): void {

          ���                 ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:424:8:

      424 ���     this.isVisible = false;

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:424:26:

      424 ���     this.isVisible = false;

          ���                           ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:425:8:

      425 ���     this.value = [];

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:425:19:

      425 ���     this.value = [];

          ���                    ^





��� [ERROR] TS2304: Cannot find name 'showModal'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:428:2:

      428 ���   showModal(type: string): void {

          ���   ~~~~~~~~~





��� [ERROR] TS2663: Cannot find name 'type'. Did you mean the instance member 'this.type'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:428:12:

      428 ���   showModal(type: string): void {

          ���             ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:428:16:

      428 ���   showModal(type: string): void {

          ���                 ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:428:18:

      428 ���   showModal(type: string): void {

          ���                   ~~~~~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:428:25:

      428 ���   showModal(type: string): void {

          ���                          ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:429:8:

      429 ���     this.type = type;

          ���         ^





��� [ERROR] TS2663: Cannot find name 'type'. Did you mean the instance member 'this.type'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:429:16:

      429 ���     this.type = type;

          ���                 ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:429:20:

      429 ���     this.type = type;

          ���                     ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:430:8:

      430 ���     this.fileList = [];

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:430:22:

      430 ���     this.fileList = [];

          ���                       ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:431:8:

      431 ���     this.errorMessage = null; // limpio error viejo de /upload

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:431:28:

      431 ���     this.errorMessage = null; // limpio error viejo de /upload

          ���                             ^





��� [ERROR] TS7006: Parameter 'type' implicitly has an 'any' type. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:433:8:

      433 ���     if (type == 'upFile') {

          ���         ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:433:13:

      433 ���     if (type == 'upFile') {

          ���              ~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:433:24:

      433 ���     if (type == 'upFile') {

          ���                         ^





��� [ERROR] TS1128: Declaration or statement expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:435:6:

      435 ���     } else {

          ���       ~~~~





��� [ERROR] Unexpected "."



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:620:18:

      620 ���             this: .isVisible = false,

          ���                   ^





script returned exit code 1
