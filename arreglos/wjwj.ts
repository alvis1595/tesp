+ npm config fix

The following configuration problems have been repaired:



~ `_auth` renamed to `//bgxpa.jfrog.io/artifactory/api/npm/norte-npm/:_auth` in user config

+ npm install -g @angular/cli



changed 268 packages in 18s



51 packages are looking for funding

  run `npm fund` for details

+ npm install

npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported

npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported



added 976 packages, and audited 977 packages in 29s



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

Application bundle generation failed. [12.797 seconds]



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



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:195:41:

      195 ���     const todayWithoutFormat: any = this.getFormattedDate();

          ���                                          ~~~~~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:2:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���   ~~~~~~~~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'getFormattedDate'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:2:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���   ~~~~~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:20:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���                     ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:22:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���                       ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:29:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���                              ^





��� [ERROR] TS2554: Expected 0-3 arguments, but got 14. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:334:29:

      334 ���   getFormattedDate(): string { //quitamos el =>

          ���                              ~~~~~~~~~~~~~~~~~~





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:335:10:

      335 ���     const options: Intl.DateTimeFormatOptions = {

          ���           ~~~~~~~





��� [ERROR] TS2552: Cannot find name 'options'. Did you mean 'Option'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:335:10:

      335 ���     const options: Intl.DateTimeFormatOptions = {

          ���           ~~~~~~~



  'Option' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:27921:12:

      27921 ��� declare var Option: {

            ���             ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:335:17:

      335 ���     const options: Intl.DateTimeFormatOptions = {

          ���                  ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:335:23:

      335 ���     const options: Intl.DateTimeFormatOptions = {

          ���                        ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:345:5:

      345 ���     };

          ���      ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:347:10:

      347 ���     const now = new Date().toLocaleString('en-US', options);

          ���           ~~~





��� [ERROR] TS2304: Cannot find name 'now'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:347:10:

      347 ���     const now = new Date().toLocaleString('en-US', options);

          ���           ~~~





��� [ERROR] TS2552: Cannot find name 'options'. Did you mean 'Option'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:347:51:

      347 ���     const now = new Date().toLocaleString('en-US', options);

          ���                                                    ~~~~~~~



  'Option' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:27921:12:

      27921 ��� declare var Option: {

            ���             ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:347:59:

      347 ���     const now = new Date().toLocaleString('en-US', options);

          ���                                                            ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:348:11:

      348 ���     return `${now} (hora est��ndar de Colombia)`;

          ���            ~~~





��� [ERROR] TS2304: Cannot find name 'now'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:348:14:

      348 ���     return `${now} (hora est��ndar de Colombia)`;

          ���               ~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:348:47:

      348 ���     return `${now} (hora est��ndar de Colombia)`;

          ���                                               ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:351:2:

      351 ���   setIndexModal(index: any) {

          ���   ~~~~~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'setIndexModal'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:351:2:

      351 ���   setIndexModal(index: any) {

          ���   ~~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:351:21:

      351 ���   setIndexModal(index: any) {

          ���                      ^





��� [ERROR] TS2693: 'any' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:351:23:

      351 ���   setIndexModal(index: any) {

          ���                        ~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:351:28:

      351 ���   setIndexModal(index: any) {

          ���                             ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:352:8:

      352 ���     this.index = index;

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:352:22:

      352 ���     this.index = index;

          ���                       ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:353:8:

      353 ���     this.getElements(index.children[0].Elementos);

          ���         ^





��� [ERROR] TS2339: Property 'children' does not exist on type 'number'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:353:27:

      353 ���     this.getElements(index.children[0].Elementos);

          ���                            ~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:353:49:

      353 ���     this.getElements(index.children[0].Elementos);

          ���                                                  ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:2:

      356 ���   getElements(elements: string) {

          ���   ~~~~~~~~~~~





��� [ERROR] TS2552: Cannot find name 'getElements'. Did you mean 'SVGSetElement'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:2:

      356 ���   getElements(elements: string) {

          ���   ~~~~~~~~~~~



  'SVGSetElement' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:21198:12:

      21198 ��� declare var SVGSetElement: {

            ���             ~~~~~~~~~~~~~





��� [ERROR] TS2552: Cannot find name 'elements'. Did you mean 'Element'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:14:

      356 ���   getElements(elements: string) {

          ���               ~~~~~~~~



  'Element' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:8334:12:

      8334 ��� declare var Element: {

           ���             ~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:22:

      356 ���   getElements(elements: string) {

          ���                       ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:24:

      356 ���   getElements(elements: string) {

          ���                         ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:356:32:

      356 ���   getElements(elements: string) {

          ���                                 ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:357:10:

      357 ���     const listas = setElementListJfrogCrq(elements);

          ���           ~~~~~~





��� [ERROR] TS2304: Cannot find name 'listas'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:357:10:

      357 ���     const listas = setElementListJfrogCrq(elements);

          ���           ~~~~~~





��� [ERROR] TS2552: Cannot find name 'elements'. Did you mean 'Element'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:357:42:

      357 ���     const listas = setElementListJfrogCrq(elements);

          ���                                           ~~~~~~~~



  'Element' is declared here.



    node_modules/typescript/lib/lib.dom.d.ts:8334:12:

      8334 ��� declare var Element: {

           ���             ~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:357:51:

      357 ���     const listas = setElementListJfrogCrq(elements);

          ���                                                    ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:358:8:

      358 ���     this.CRQElements = listas[0];

          ���         ^





��� [ERROR] TS2304: Cannot find name 'listas'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:358:23:

      358 ���     this.CRQElements = listas[0];

          ���                        ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:358:32:

      358 ���     this.CRQElements = listas[0];

          ���                                 ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:359:8:

      359 ���     this.jfrogElements = listas[1];

          ���         ^





��� [ERROR] TS2304: Cannot find name 'listas'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:359:25:

      359 ���     this.jfrogElements = listas[1];

          ���                          ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:359:34:

      359 ���     this.jfrogElements = listas[1];

          ���                                   ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:2:

      362 ���   getUrl(html: string) {

          ���   ~~~~~~





��� [ERROR] TS2304: Cannot find name 'getUrl'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:2:

      362 ���   getUrl(html: string) {

          ���   ~~~~~~





��� [ERROR] TS2304: Cannot find name 'html'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:9:

      362 ���   getUrl(html: string) {

          ���          ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:13:

      362 ���   getUrl(html: string) {

          ���              ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:15:

      362 ���   getUrl(html: string) {

          ���                ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:362:23:

      362 ���   getUrl(html: string) {

          ���                        ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:363:11:

      363 ���     return getUrlFromA(html);

          ���            ~~~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'html'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:363:23:

      363 ���     return getUrlFromA(html);

          ���                        ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:363:28:

      363 ���     return getUrlFromA(html);

          ���                             ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:366:2:

      366 ���   handleCancel(): void {

          ���   ~~~~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'handleCancel'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:366:2:

      366 ���   handleCancel(): void {

          ���   ~~~~~~~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:366:16:

      366 ���   handleCancel(): void {

          ���                 ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:367:8:

      367 ���     this.isVisible = false;

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:367:26:

      367 ���     this.isVisible = false;

          ���                           ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:368:8:

      368 ���     this.value = [];

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:368:19:

      368 ���     this.value = [];

          ���                    ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:2:

      371 ���   showModal(type: string): void {

          ���   ~~~~~~~~~





��� [ERROR] TS2304: Cannot find name 'showModal'. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:2:

      371 ���   showModal(type: string): void {

          ���   ~~~~~~~~~





��� [ERROR] TS2663: Cannot find name 'type'. Did you mean the instance member 'this.type'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:12:

      371 ���   showModal(type: string): void {

          ���             ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:16:

      371 ���   showModal(type: string): void {

          ���                 ^





��� [ERROR] TS2693: 'string' only refers to a type, but is being used as a value here. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:18:

      371 ���   showModal(type: string): void {

          ���                   ~~~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:371:25:

      371 ���   showModal(type: string): void {

          ���                          ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:372:8:

      372 ���     this.type = type;

          ���         ^





��� [ERROR] TS2663: Cannot find name 'type'. Did you mean the instance member 'this.type'? [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:372:16:

      372 ���     this.type = type;

          ���                 ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:372:20:

      372 ���     this.type = type;

          ���                     ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:373:8:

      373 ���     this.fileList = [];

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:373:22:

      373 ���     this.fileList = [];

          ���                       ^





��� [ERROR] TS1005: ':' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:374:8:

      374 ���     this.errorMessage = null; // limpio error viejo de /upload

          ���         ^





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:374:28:

      374 ���     this.errorMessage = null; // limpio error viejo de /upload

          ���                             ^





��� [ERROR] TS7006: Parameter 'type' implicitly has an 'any' type. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:376:8:

      376 ���     if (type == 'upFile') {

          ���         ~~~~





��� [ERROR] TS1005: ',' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:376:13:

      376 ���     if (type == 'upFile') {

          ���              ~~





��� [ERROR] TS1005: ';' expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:376:26:

      376 ���     if (type == 'upFile') {

          ���                           ^





��� [ERROR] TS1128: Declaration or statement expected. [plugin angular-compiler]



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:378:6:

      378 ���     } else {

          ���       ~~~~





��� [ERROR] Expected identifier but found ":"



    src/app/feature/paseExpress/pages/listado-de-cambios/listado-de-cambios.component.ts:533:34:

      533 ���             const: options, Intl, : .DateTimeFormatOptions = {

          ���                                   ^





script returned exit code 1
