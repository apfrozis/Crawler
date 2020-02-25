(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
        /***/ "./$$_lazy_route_resource lazy recursive": 
        /*!******************************************************!*\
          !*** ./$$_lazy_route_resource lazy namespace object ***!
          \******************************************************/
        /*! no static exports found */
        /***/ (function (module, exports) {
            function webpackEmptyAsyncContext(req) {
                // Here Promise.resolve().then() is used instead of new Promise() to prevent
                // uncaught exception popping up in devtools
                return Promise.resolve().then(function () {
                    var e = new Error("Cannot find module '" + req + "'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                });
            }
            webpackEmptyAsyncContext.keys = function () { return []; };
            webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
            module.exports = webpackEmptyAsyncContext;
            webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html": 
        /*!**************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
          \**************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<!--<app-stat-results></app-stat-results>-->\n<router-outlet></router-outlet>");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/games-dashboard/games-dashboard.component.html": 
        /*!******************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/games-dashboard/games-dashboard.component.html ***!
          \******************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<app-main-nav>\n<div class=\"\" style=\"margin-left: 3%;margin-right: 3%;\" *ngIf=\"dashboardMetrics\">\n  <br>\n  <div class=\"row\">\n  <h1>Dashboard - </h1><h3>Comparação de resultados reais com as propostas do algoritmo</h3>\n</div>\n  <mat-grid-list cols=\"3\" style=\"max-padding: 100px\">\n    <mat-grid-tile>\n        <mat-card class=\"example-card\">\n          <mat-card-header>\n            <mat-card-title><h2 style=\"text-align: center;\">Numero de jogos propostos pelo algoritmo</h2></mat-card-title>\n          </mat-card-header>\n          <mat-divider></mat-divider>\n          <br>\n          <mat-card-content>\n           <h3 style=\"text-align: center;\">{{dashboardMetrics.numeroDeJogos}}</h3>\n          </mat-card-content>\n    </mat-card>\n    </mat-grid-tile>\n    <mat-grid-tile>\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title><h2 style=\"text-align: center;\">Numero de jogos propostos pelo algoritmo</h2></mat-card-title>\n      </mat-card-header>\n      <mat-divider></mat-divider>\n      <br>\n      <mat-card-content>\n       <h3 style=\"text-align: center;\">{{dashboardMetrics.numeroDeJogos}}</h3>\n      </mat-card-content>\n</mat-card>\n</mat-grid-tile>\n<mat-grid-tile>\n<mat-card class=\"example-card\">\n  <mat-card-header>\n    <mat-card-title><h2 style=\"text-align: center;\">Numero de jogos propostos pelo algoritmo</h2></mat-card-title>\n  </mat-card-header>\n  <mat-divider></mat-divider>\n  <br>\n  <mat-card-content>\n   <h3 style=\"text-align: center;\">{{dashboardMetrics.numeroDeJogos}}</h3>\n  </mat-card-content>\n</mat-card>\n</mat-grid-tile>\n  </mat-grid-list>\n\n<mat-tab-group>\n  <mat-tab label=\"Resumo para apostas + 1,5 golos\">\n    <mat-grid-list cols=\"4\">\n        <mat-grid-tile\n        [colspan]=\"2\"\n        [rowspan]=\"1\">\n    <mat-card class=\"example-card\">\n        <mat-card-header>\n          <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (positivo) do algoritmo</h2></mat-card-title>\n        </mat-card-header>\n        <mat-divider></mat-divider>\n        <br>\n        <mat-card-content>\n         <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoPositivo15}}</h3>\n        </mat-card-content>\n      </mat-card>\n      </mat-grid-tile>\n      <mat-grid-tile\n      [colspan]=\"2\"\n      [rowspan]=\"1\">\n      <mat-card class=\"example-card\">\n        <mat-card-header>\n          <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (positivo) do algoritmo</h2></mat-card-title>\n        </mat-card-header>\n        <mat-divider></mat-divider>\n        <br>\n        <mat-card-content>\n         <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoPositivo15}}</h3>\n        </mat-card-content>\n      </mat-card>\n    </mat-grid-tile>\n    <mat-grid-tile\n    [colspan]=\"2\"\n    [rowspan]=\"1\">\n      <mat-card class=\"example-card\">\n        <mat-card-header>\n          <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (negativo) do algoritmo</h2></mat-card-title>\n        </mat-card-header>\n        <mat-divider></mat-divider>\n        <br>\n        <mat-card-content>\n         <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoNegativo15}}</h3>\n        </mat-card-content>\n      </mat-card>\n    </mat-grid-tile>\n    <mat-grid-tile\n    [colspan]=\"2\"\n    [rowspan]=\"1\">\n      <mat-card class=\"example-card\">\n        <mat-card-header>\n          <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (negativo) do algoritmo</h2></mat-card-title>\n        </mat-card-header>\n        <mat-divider></mat-divider>\n            <br>\n        <mat-card-content>\n         <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoNegativo15}}</h3>\n        </mat-card-content>\n      </mat-card> \n      </mat-grid-tile>\n      </mat-grid-list>   \n  </mat-tab>\n  <mat-tab label=\"Resumo para apostas + 2,5 golos\">\n      <mat-grid-list cols=\"4\">\n          <mat-grid-tile\n          [colspan]=\"2\"\n          [rowspan]=\"1\">\n      <mat-card class=\"example-card\">\n          <mat-card-header>\n            <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (positivo) do algoritmo</h2></mat-card-title>\n          </mat-card-header>\n          <mat-divider></mat-divider>\n          <br>\n          <mat-card-content>\n           <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoPositivo25}}</h3>\n          </mat-card-content>\n        </mat-card>\n        </mat-grid-tile>\n        <mat-grid-tile\n        [colspan]=\"2\"\n        [rowspan]=\"1\">\n        <mat-card class=\"example-card\">\n          <mat-card-header>\n            <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (positivo) do algoritmo</h2></mat-card-title>\n          </mat-card-header>\n          <mat-divider></mat-divider>\n          <br>\n          <mat-card-content>\n           <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoPositivo25}}</h3>\n          </mat-card-content>\n        </mat-card>\n      </mat-grid-tile>\n      <mat-grid-tile\n      [colspan]=\"2\"\n      [rowspan]=\"1\">\n        <mat-card class=\"example-card\">\n          <mat-card-header>\n            <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (negativo) do algoritmo</h2></mat-card-title>\n          </mat-card-header>\n          <mat-divider></mat-divider>\n          <br>\n          <mat-card-content>\n           <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoNegativo25}}</h3>\n          </mat-card-content>\n        </mat-card>\n      </mat-grid-tile>\n      <mat-grid-tile\n      [colspan]=\"2\"\n      [rowspan]=\"1\">\n        <mat-card class=\"example-card\">\n          <mat-card-header>\n            <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (negativo) do algoritmo</h2></mat-card-title>\n          </mat-card-header>\n          <mat-divider></mat-divider>\n              <br>\n          <mat-card-content>\n           <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoNegativo25}}</h3>\n          </mat-card-content>\n        </mat-card> \n        </mat-grid-tile>\n      </mat-grid-list>\n  </mat-tab>\n  <mat-tab label=\"Resumo para apostas + 3,5 golos\">\n    <mat-grid-list cols=\"4\">\n      <mat-grid-tile\n      [colspan]=\"2\"\n      [rowspan]=\"1\">\n  <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (positivo) do algoritmo</h2></mat-card-title>\n      </mat-card-header>\n      <mat-divider></mat-divider>\n      <br>\n      <mat-card-content>\n       <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoPositivo35}}</h3>\n      </mat-card-content>\n    </mat-card>\n    </mat-grid-tile>\n    <mat-grid-tile\n    [colspan]=\"2\"\n    [rowspan]=\"1\">\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (positivo) do algoritmo</h2></mat-card-title>\n      </mat-card-header>\n      <mat-divider></mat-divider>\n      <br>\n      <mat-card-content>\n       <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoPositivo35}}</h3>\n      </mat-card-content>\n    </mat-card>\n  </mat-grid-tile>\n  <mat-grid-tile\n  [colspan]=\"2\"\n  [rowspan]=\"1\">\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title><h2 style=\"text-align: center;\">Percentagem de sucesso (negativo) do algoritmo</h2></mat-card-title>\n      </mat-card-header>\n      <mat-divider></mat-divider>\n      <br>\n      <mat-card-content>\n       <h3 style=\"text-align: center;\">{{dashboardMetrics.sucessoNegativo35}}</h3>\n      </mat-card-content>\n    </mat-card>\n  </mat-grid-tile>\n  <mat-grid-tile\n  [colspan]=\"2\"\n  [rowspan]=\"1\">\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title><h2 style=\"text-align: center;\">Percentagem de insucesso (negativo) do algoritmo</h2></mat-card-title>\n      </mat-card-header>\n      <mat-divider></mat-divider>\n          <br>\n      <mat-card-content>\n       <h3 style=\"text-align: center;\">{{dashboardMetrics.insucessoNegativo35}}</h3>\n      </mat-card-content>\n    </mat-card> \n    </mat-grid-tile>\n  </mat-grid-list>\n    \n  </mat-tab>\n</mat-tab-group>\n\n  \n\n  \n\n</div>\n\n</app-main-nav>");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-nav/main-nav.component.html": 
        /*!****************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-nav/main-nav.component.html ***!
          \****************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<!--<mat-sidenav-container class=\"sidenav-container\">\n  <mat-sidenav #drawer class=\"sidenav\" fixedInViewport=\"false\"\n      [attr.role]=\"(isHandset$ | async) ? 'dialog' : 'navigation'\"\n      [mode]=\"(isHandset$ | async) ? 'over' : 'side'\"\n      [opened]=\"(isHandset$ | async) === false\">\n    <mat-toolbar>Menu</mat-toolbar>\n    <mat-nav-list>\n      <a mat-list-item href=\"#\">Link 1</a>\n      <a mat-list-item href=\"#\">Link 2</a>\n      <a mat-list-item href=\"#\">Link 3</a>\n    </mat-nav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>\n    <mat-toolbar color=\"primary\">\n      <button\n        type=\"button\"\n        aria-label=\"Toggle sidenav\"\n        mat-icon-button\n        (click)=\"drawer.toggle()\"\n        *ngIf=\"isHandset$ | async\">\n        <mat-icon aria-label=\"Side nav toggle icon\">menu</mat-icon>\n      </button>\n      <span>Crawler-frontend-angular</span>\n    </mat-toolbar>\n   <ng-content></ng-content>\n  </mat-sidenav-content>\n</mat-sidenav-container>-->\n\n<mat-toolbar id=\"mainToolbar\" color=\"primary\">\n  <mat-icon\n    (click)=\"onToolbarMenuToggle()\"\n    id=\"toolbarMenu\">subject</mat-icon>\n  Apostar agora é mais fácil\n  <span class=\"toolbar-spacer\"></span>\n  <mat-icon\n    class=\"toolbar-icon\"\n    matBadge=\"8\"\n    matBadgePosition=\"after\"\n    matBadgeColor=\"accent\"\n  >notifications</mat-icon>\n</mat-toolbar>\n\n<mat-sidenav-container\n  id=\"sidenavContainer\"\n fullscreen>\n  <mat-sidenav\n    mode=\"side\"\n    #sidenav\n    id=\"sidenav\"\n    [class.menu-open]=\"isMenuOpen\"\n    [class.menu-close]=\"!isMenuOpen\"\n    opened>\n    \n    <mat-list id=\"menus\">\n      <mat-card>\n        <mat-card-header>\n          <div \n            mat-card-avatar \n            class=\"avatar\"></div>\n\n          <mat-card-title>Afonso Ribeiro</mat-card-title>\n          <mat-card-subtitle>Apostador Pro</mat-card-subtitle>\n        </mat-card-header>\n      </mat-card>\n      <mat-list-item>\n        <button \n        class=\"menu-item\"\n          mat-flat-button\n          routerLink=\"/games-dashboard\">\n          <mat-icon>dashboard</mat-icon>\n        Dashboard</button>\n      </mat-list-item>\n\n      <mat-list-item>\n          <button \n          class=\"menu-item\"\n            mat-flat-button\n            routerLink=\"/stat-results\">\n            <mat-icon>games</mat-icon>\n          Listagem de jogos</button>\n        </mat-list-item>\n\n    </mat-list>\n  </mat-sidenav>\n    <ng-content></ng-content>\n</mat-sidenav-container>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/stat-results/stat-results.component.html": 
        /*!************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/stat-results/stat-results.component.html ***!
          \************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<link href=\"//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n\n<app-main-nav>\n\n<div class=\"\" style=\"margin-left: 3%;margin-right: 3%;\">\n  <br>\n<h1>Lista de jogos para apostar</h1>\n\n<br>\n<label style=\"padding: 20px\"><b>Selecione a data dos jogos em que quer apostar: </b></label>\n\n<mat-form-field>\n  <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\"(dateChange)=\"addEvent('change', $event)\" >\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>\n\n<br>\n\n<div class=\"module\" style=\"min-width: 100%;\" *ngIf=\"listaJogosAnalisados.data.length\">\n        <table mat-table class= \"table\" id=\"tablegames\" [dataSource]=\"listaJogosAnalisados.data\" matSort>\n\n            <ng-container matColumnDef=\"liga\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Liga </th>\n                <td mat-cell *matCellDef=\"let element\"><a href=\"https://www.soccerstats.com/{{element.href}}\">{{element.liga}}</a></td>\n              </ng-container>\n              <ng-container matColumnDef=\"equipaCasa.nomeEquipa\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header>Equipa casa </th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.equipaCasa.nomeEquipa}} </td>\n                </ng-container>\n                <ng-container matColumnDef=\"equipaFora.nomeEquipa\">\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Equipa fora </th>\n                    <td mat-cell *matCellDef=\"let element\"> {{element.equipaFora.nomeEquipa}} </td>\n                  </ng-container>\n                 <!-- <ng-container matColumnDef=\"over15validation\">\n                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Passou na aposta (1,5)</th>\n                      <td mat-cell *matCellDef=\"let element\"> {{element.over15validation}} </td>\n                    </ng-container>\n                    <ng-container matColumnDef=\"over15standardDeviation\">\n                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Desvio (1,5)</th>\n                        <td mat-cell *matCellDef=\"let element\"> {{element.over15standardDeviation}} </td>\n                      </ng-container>-->\n                      <ng-container matColumnDef=\"over25validation\">\n                          <th mat-header-cell *matHeaderCellDef mat-sort-header>Passou na aposta (2,5)</th>\n                          <td mat-cell *matCellDef=\"let element\"> {{element.over25validation}} </td>\n                        </ng-container>\n                        <ng-container matColumnDef=\"over25standardDeviation\">\n                            <th mat-header-cell *matHeaderCellDef mat-sort-header>Desvio (2,5)</th>\n                            <td mat-cell *matCellDef=\"let element\"> {{element.over25standardDeviation}} </td>\n                          </ng-container>\n                          <ng-container matColumnDef=\"over35validation\">\n                              <th mat-header-cell *matHeaderCellDef mat-sort-header>Passou na aposta (3,5)</th>\n                              <td mat-cell *matCellDef=\"let element\"> {{element.over35validation}} </td>\n                            </ng-container>\n                            <ng-container matColumnDef=\"over35standardDeviation\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Desvio (3,5)</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.over35standardDeviation}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"medgolcasa4\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Med Gol Casa 4</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.goalsScoredLast4GamesHome}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"medsofrcasa4\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Med Sofr Casa 4</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.goalsConcededLast4GamesHome}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"medgolfora4\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Med Gol Fora 4</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.goalsScoredLast4GamesAway}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"medsofrfora4\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Med Sofr Fora 4</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.goalsConcededLast4GamesAway}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"goalsScoredPlusConceded\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Soma de golos</th>\n                                <td mat-cell *matCellDef=\"let element\"> {{element.goalsScoredPlusConceded}} </td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"gameResult\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header>Resultado</th>\n                                <td mat-cell *matCellDef=\"let element\"> \n                                    <div *ngIf=\"element.hasOwnProperty('gameHistory'); else elseDiv\">\n                                        {{element.gameHistory.totalScore}} \n                                    </div>\n                                    <ng-template #elseDiv>\n                                        ----\n                                    </ng-template></td>\n                              </ng-container>\n                              <ng-container matColumnDef=\"gameStatus\">\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header></th>\n                                <td mat-cell *matCellDef=\"let element\"> \n                                  <div *ngIf=\"element.hasOwnProperty('gameHistory') && element.over35validation=='Passou' && element.goalsScoredPlusConceded >=2.5 && element.gameHistory.totalScore >=3; else red\">\n                                    <mat-icon style=\"color: green\">done_outline</mat-icon>\n                                </div>\n                                <ng-template #red>\n                                  <mat-icon *ngIf=\"element.hasOwnProperty('gameHistory') &&  element.over35validation=='Passou' && element.goalsScoredPlusConceded >=2.5 && element.gameHistory.totalScore <= 2; else empty\" style=\"color: red\">highlight_off</mat-icon>\n                                </ng-template>\n                                <ng-template #empty>\n                                </ng-template>\n                              </ng-container>\n                              <tr mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"vertical-alignemnt\"></tr>\n                              <tr class=\"trhover vertical-alignemnt\" mat-row *matRowDef=\"let element; columns: displayedColumns;\"></tr>\n\n                     <!-- <tr class=\"trhover\" *ngFor=\"let jogoAnalisado of listaJogosAnalisados\">\n                        <td><b>{{jogoAnalisado.liga}}</b></td>\n                        <td>{{jogoAnalisado.equipaCasa.nomeEquipa}}</td>\n                        <td>{{jogoAnalisado.equipaFora.nomeEquipa}}</td>\n                        <td>{{jogoAnalisado.over15validation}}</td>\n                        <td  *ngIf=\"dataFutura\">{{jogoAnalisado.over15standardDeviation}}</td>\n                        <td *ngIf=\"!dataFutura\">{{jogoAnalisado.over15validation}}</td>\n                        <td>{{jogoAnalisado.over25validation}}</td>\n                        <td *ngIf=\"dataFutura\">{{jogoAnalisado.over25standardDeviation}}</td>\n                        <td *ngIf=\"!dataFutura\">{{jogoAnalisado.realOver25validation}}</td>\n                        <td>{{jogoAnalisado.over35validation}}</td>\n                        <td *ngIf=\"dataFutura\">{{jogoAnalisado.over35standardDeviation}}</td>\n                        <td *ngIf=\"!dataFutura\">{{jogoAnalisado.realOver15validation}}</td>\n                      </tr>-->\n\n\n                      \n              </table>\n</div>\n\n\n<!--<div  *ngIf=\"listaJogosAnalisados\" class=\"module \">\n        <table class=\"table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Liga</th>\n                    <th scope=\"col\">Equipa que joga em casa</th>\n                    <th scope=\"col\">Equipa que joga fora</th>\n                    <th scope=\"col\">Passou na aposta dos 1,5</th>\n                    <th scope=\"col\">Desvio 1,5</th>\n                    <th scope=\"col\">Passou na aposta dos 2,5</th>\n                    <th scope=\"col\">Desvio 2,5</th>\n                    <th scope=\"col\">Passou na aposta dos 3,5</th>\n                    <th scope=\"col\">Desvio 3,5</th>\n                  </tr>\n                </thead>\n                <tbody *ngFor=\"let jogoAnalisado of listaJogosAnalisados\" routerLink=\"\">\n                  <tr>\n                    <td>{{jogoAnalisado.liga}}</td>\n                    <td>{{jogoAnalisado.equipaCasa.nomeEquipa}}</td>\n                    <td>{{jogoAnalisado.equipaFora.nomeEquipa}}</td>\n                    <td>{{jogoAnalisado.over15validation}}</td>\n                    <td>{{jogoAnalisado.over15standardDeviation}}</td>\n                    <td>{{jogoAnalisado.over25validation}}</td>\n                    <td>{{jogoAnalisado.over25standardDeviation}}</td>\n                    <td>{{jogoAnalisado.over35validation}}</td>\n                    <td>{{jogoAnalisado.over35standardDeviation}}</td>\n                  </tr>\n                </tbody>\n              </table>\n</div>-->\n\n</div>\n\n</app-main-nav>");
            /***/ 
        }),
        /***/ "./node_modules/tslib/tslib.es6.js": 
        /*!*****************************************!*\
          !*** ./node_modules/tslib/tslib.es6.js ***!
          \*****************************************/
        /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function () { return __extends; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function () { return __assign; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function () { return __rest; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function () { return __decorate; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function () { return __param; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function () { return __metadata; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function () { return __awaiter; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function () { return __generator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function () { return __exportStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function () { return __values; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function () { return __read; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function () { return __spread; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () { return __spreadArrays; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function () { return __await; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () { return __asyncGenerator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () { return __asyncDelegator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function () { return __asyncValues; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () { return __makeTemplateObject; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function () { return __importStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function () { return __importDefault; });
            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0
            
            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.
            
            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p]; };
                return extendStatics(d, b);
            };
            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            var __assign = function () {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                                t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            function __rest(s, e) {
                var t = {};
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                        t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            }
            function __decorate(decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }
            function __param(paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); };
            }
            function __metadata(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(metadataKey, metadataValue);
            }
            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try {
                        step(generator.next(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function rejected(value) { try {
                        step(generator["throw"](value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }
            function __generator(thisArg, body) {
                var _ = { label: 0, sent: function () { if (t[0] & 1)
                        throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return { value: op[1], done: false };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        }
                        catch (e) {
                            op = [6, e];
                            y = 0;
                        }
                        finally {
                            f = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return { value: op[0] ? op[1] : void 0, done: true };
                }
            }
            function __exportStar(m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            function __values(o) {
                var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
                if (m)
                    return m.call(o);
                return {
                    next: function () {
                        if (o && i >= o.length)
                            o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
            }
            function __read(o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                if (!m)
                    return o;
                var i = m.call(o), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                        ar.push(r.value);
                }
                catch (error) {
                    e = { error: error };
                }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"]))
                            m.call(i);
                    }
                    finally {
                        if (e)
                            throw e.error;
                    }
                }
                return ar;
            }
            function __spread() {
                for (var ar = [], i = 0; i < arguments.length; i++)
                    ar = ar.concat(__read(arguments[i]));
                return ar;
            }
            function __spreadArrays() {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                    s += arguments[i].length;
                for (var r = Array(s), k = 0, i = 0; i < il; i++)
                    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                        r[k] = a[j];
                return r;
            }
            ;
            function __await(v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            }
            function __asyncGenerator(thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n])
                    i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try {
                    step(g[n](v));
                }
                catch (e) {
                    settle(q[0][3], e);
                } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length)
                    resume(q[0][0], q[0][1]); }
            }
            function __asyncDelegator(o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            }
            function __asyncValues(o) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
            }
            function __makeTemplateObject(cooked, raw) {
                if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", { value: raw });
                }
                else {
                    cooked.raw = raw;
                }
                return cooked;
            }
            ;
            function __importStar(mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (Object.hasOwnProperty.call(mod, k))
                            result[k] = mod[k];
                result.default = mod;
                return result;
            }
            function __importDefault(mod) {
                return (mod && mod.__esModule) ? mod : { default: mod };
            }
            /***/ 
        }),
        /***/ "./src/app/app-routing.module.ts": 
        /*!***************************************!*\
          !*** ./src/app/app-routing.module.ts ***!
          \***************************************/
        /*! exports provided: AppRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () { return AppRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _stat_results_stat_results_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stat-results/stat-results.component */ "./src/app/stat-results/stat-results.component.ts");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _games_dashboard_games_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./games-dashboard/games-dashboard.component */ "./src/app/games-dashboard/games-dashboard.component.ts");
            var routes = [
                { path: '', redirectTo: '/games-dashboard', pathMatch: 'full' },
                { path: 'stat-results', component: _stat_results_stat_results_component__WEBPACK_IMPORTED_MODULE_2__["StatResultsComponent"] },
                { path: 'games-dashboard', component: _games_dashboard_games_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["GamesDashboardComponent"] }
            ];
            var AppRoutingModule = /** @class */ (function () {
                function AppRoutingModule() {
                }
                return AppRoutingModule;
            }());
            AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [],
                    imports: [
                        _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)
                    ],
                    exports: [
                        _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
                    ]
                })
            ], AppRoutingModule);
            /***/ 
        }),
        /***/ "./src/app/app.component.css": 
        /*!***********************************!*\
          !*** ./src/app/app.component.css ***!
          \***********************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");
            /***/ 
        }),
        /***/ "./src/app/app.component.ts": 
        /*!**********************************!*\
          !*** ./src/app/app.component.ts ***!
          \**********************************/
        /*! exports provided: AppComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function () { return AppComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var AppComponent = /** @class */ (function () {
                function AppComponent() {
                    this.title = 'Crawler-frontend-angular';
                }
                return AppComponent;
            }());
            AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-root',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
                })
            ], AppComponent);
            /***/ 
        }),
        /***/ "./src/app/app.module.ts": 
        /*!*******************************!*\
          !*** ./src/app/app.module.ts ***!
          \*******************************/
        /*! exports provided: AppModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function () { return AppModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
            /* harmony import */ var _stat_results_stat_results_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stat-results/stat-results.component */ "./src/app/stat-results/stat-results.component.ts");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
            /* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm2015/sidenav.js");
            /* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
            /* harmony import */ var _main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./main-nav/main-nav.component */ "./src/app/main-nav/main-nav.component.ts");
            /* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm2015/layout.js");
            /* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
            /* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
            /* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
            /* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm2015/list.js");
            /* harmony import */ var _games_dashboard_games_dashboard_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./games-dashboard/games-dashboard.component */ "./src/app/games-dashboard/games-dashboard.component.ts");
            /* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
            /* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
            var AppModule = /** @class */ (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    declarations: [
                        _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                        _stat_results_stat_results_component__WEBPACK_IMPORTED_MODULE_4__["StatResultsComponent"],
                        _main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_9__["MainNavComponent"],
                        _games_dashboard_games_dashboard_component__WEBPACK_IMPORTED_MODULE_15__["GamesDashboardComponent"]
                    ],
                    imports: [
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatNativeDateModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatFormFieldModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__["LayoutModule"],
                        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
                        _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
                        _angular_material_list__WEBPACK_IMPORTED_MODULE_14__["MatListModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatCardModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatGridListModule"],
                        _app_routing_module__WEBPACK_IMPORTED_MODULE_16__["AppRoutingModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTabsModule"],
                        _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__["MatSortModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableModule"]
                    ],
                    providers: [],
                    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
                })
            ], AppModule);
            /***/ 
        }),
        /***/ "./src/app/games-dashboard.service.ts": 
        /*!********************************************!*\
          !*** ./src/app/games-dashboard.service.ts ***!
          \********************************************/
        /*! exports provided: GamesDashboardService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesDashboardService", function () { return GamesDashboardService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            var GamesDashboardService = /** @class */ (function () {
                function GamesDashboardService(http) {
                    this.http = http;
                    this.httpOptions = {
                        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                            "Access-Control-Allow-Origin": '*',
                            "Access-Control-Allow-Headers": "Content-Type"
                        })
                    };
                }
                GamesDashboardService.prototype.getDashdoardMetrics = function () {
                    var _this = this;
                    var url = 'http://localhost:8080/getdashboardmetrics';
                    return this.http.get(url, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_) { return _this.log("fetched hero id="); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError("getHero id=")));
                };
                /**
                 * Handle Http operation that failed.
                 * Let the app continue.
                 * @param operation - name of the operation that failed
                 * @param result - optional value to return as the observable result
                 */
                GamesDashboardService.prototype.handleError = function (operation, result) {
                    var _this = this;
                    if (operation === void 0) { operation = 'operation'; }
                    return function (error) {
                        // TODO: send the error to remote logging infrastructure
                        console.error(error); // log to console instead
                        // TODO: better job of transforming error for user consumption
                        _this.log(operation + " failed: " + error.message);
                        // Let the app keep running by returning an empty result.
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(result);
                    };
                };
                /** Log a HeroService message with the MessageService */
                GamesDashboardService.prototype.log = function (message) {
                };
                return GamesDashboardService;
            }());
            GamesDashboardService.ctorParameters = function () { return [
                { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
            ]; };
            GamesDashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                })
            ], GamesDashboardService);
            /***/ 
        }),
        /***/ "./src/app/games-dashboard/games-dashboard.component.css": 
        /*!***************************************************************!*\
          !*** ./src/app/games-dashboard/games-dashboard.component.css ***!
          \***************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (".example-card {\n    max-width: 400px;\n  }\n  \n  .example-header-image {\n    background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');\n    background-size: cover;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZXMtZGFzaGJvYXJkL2dhbWVzLWRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsbUZBQW1GO0lBQ25GLHNCQUFzQjtFQUN4QiIsImZpbGUiOiJzcmMvYXBwL2dhbWVzLWRhc2hib2FyZC9nYW1lcy1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWNhcmQge1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gIH1cbiAgXG4gIC5leGFtcGxlLWhlYWRlci1pbWFnZSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vYXNzZXRzL2ltZy9leGFtcGxlcy9zaGliYTEuanBnJyk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgfSJdfQ== */");
            /***/ 
        }),
        /***/ "./src/app/games-dashboard/games-dashboard.component.ts": 
        /*!**************************************************************!*\
          !*** ./src/app/games-dashboard/games-dashboard.component.ts ***!
          \**************************************************************/
        /*! exports provided: GamesDashboardComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesDashboardComponent", function () { return GamesDashboardComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _games_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../games-dashboard.service */ "./src/app/games-dashboard.service.ts");
            var GamesDashboardComponent = /** @class */ (function () {
                function GamesDashboardComponent(_gamesDashboardService) {
                    this._gamesDashboardService = _gamesDashboardService;
                    this.dashboardMetrics = { numeroDeJogos: '100',
                        sucessoPositivo15: '100',
                        insucessoPositivo15: '100',
                        sucessoNegativo15: '100',
                        insucessoNegativo15: '100',
                        sucessoPositivo25: '100',
                        insucessoPositivo25: '100',
                        sucessoNegativo25: '100',
                        insucessoNegativo25: '100',
                        sucessoPositivo35: '100',
                        insucessoPositivo35: '100',
                        sucessoNegativo35: '100',
                        insucessoNegativo35: '100',
                    };
                }
                GamesDashboardComponent.prototype.ngOnInit = function () {
                    //this.getDashdoardMetrics();
                };
                GamesDashboardComponent.prototype.getDashdoardMetrics = function () {
                    /* this._gamesDashboardService.getDashdoardMetrics()
                     .subscribe(
                       dashboardMetrics => this.dashboardMetrics = dashboardMetrics
                       );*/
                };
                return GamesDashboardComponent;
            }());
            GamesDashboardComponent.ctorParameters = function () { return [
                { type: _games_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["GamesDashboardService"] }
            ]; };
            GamesDashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-games-dashboard',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./games-dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/games-dashboard/games-dashboard.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./games-dashboard.component.css */ "./src/app/games-dashboard/games-dashboard.component.css")).default]
                })
            ], GamesDashboardComponent);
            /***/ 
        }),
        /***/ "./src/app/main-nav/main-nav.component.css": 
        /*!*************************************************!*\
          !*** ./src/app/main-nav/main-nav.component.css ***!
          \*************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (".sidenav-container {\n  height: 100%;\n}\n\n.sidenav {\n  width: 200px;\n}\n\n.sidenav .mat-toolbar {\n  background: inherit;\n}\n\n.mat-toolbar.mat-primary {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\nbody{\n  margin: 0\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi1uYXYvbWFpbi1uYXYuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHdCQUFnQjtFQUFoQixnQkFBZ0I7RUFDaEIsTUFBTTtFQUNOLFVBQVU7QUFDWjs7QUFFQTtFQUNFO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9tYWluLW5hdi9tYWluLW5hdi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGVuYXYtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uc2lkZW5hdiB7XG4gIHdpZHRoOiAyMDBweDtcbn1cblxuLnNpZGVuYXYgLm1hdC10b29sYmFyIHtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbn1cblxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAxO1xufVxuXG5ib2R5e1xuICBtYXJnaW46IDBcbn0iXX0= */");
            /***/ 
        }),
        /***/ "./src/app/main-nav/main-nav.component.ts": 
        /*!************************************************!*\
          !*** ./src/app/main-nav/main-nav.component.ts ***!
          \************************************************/
        /*! exports provided: MainNavComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainNavComponent", function () { return MainNavComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var MainNavComponent = /** @class */ (function () {
                function MainNavComponent() {
                    this.title = 'AngularMaterialGettingStarted';
                    this.isMenuOpen = true;
                    this.contentMargin = 240;
                    this.task = [
                        'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
                    ];
                }
                MainNavComponent.prototype.onToolbarMenuToggle = function () {
                    console.log('On toolbar toggled', this.isMenuOpen);
                    this.isMenuOpen = !this.isMenuOpen;
                    if (!this.isMenuOpen) {
                        this.contentMargin = 70;
                    }
                    else {
                        this.contentMargin = 240;
                    }
                };
                return MainNavComponent;
            }());
            MainNavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-main-nav',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./main-nav.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-nav/main-nav.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./main-nav.component.css */ "./src/app/main-nav/main-nav.component.css")).default]
                })
            ], MainNavComponent);
            /***/ 
        }),
        /***/ "./src/app/stat-results.service.ts": 
        /*!*****************************************!*\
          !*** ./src/app/stat-results.service.ts ***!
          \*****************************************/
        /*! exports provided: StatResultsService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatResultsService", function () { return StatResultsService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
            var StatResultsService = /** @class */ (function () {
                function StatResultsService(http) {
                    this.http = http;
                    this.httpOptions = {
                        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                            "Access-Control-Allow-Origin": '*',
                            "Access-Control-Allow-Headers": "Content-Type"
                        })
                    };
                }
                StatResultsService.prototype.getListaJogosAnalisados = function (data_pesquisa) {
                    var _this = this;
                    var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + '/getstats';
                    this.httpOptions['params'] = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('search', data_pesquisa);
                    return this.http.get(url, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_) { return _this.log("fetched hero id="); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError("getHero id=")));
                };
                /**
                 * Handle Http operation that failed.
                 * Let the app continue.
                 * @param operation - name of the operation that failed
                 * @param result - optional value to return as the observable result
                 */
                StatResultsService.prototype.handleError = function (operation, result) {
                    var _this = this;
                    if (operation === void 0) { operation = 'operation'; }
                    return function (error) {
                        // TODO: send the error to remote logging infrastructure
                        console.error(error); // log to console instead
                        // TODO: better job of transforming error for user consumption
                        _this.log(operation + " failed: " + error.message);
                        // Let the app keep running by returning an empty result.
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(result);
                    };
                };
                /** Log a HeroService message with the MessageService */
                StatResultsService.prototype.log = function (message) {
                };
                return StatResultsService;
            }());
            StatResultsService.ctorParameters = function () { return [
                { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
            ]; };
            StatResultsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                })
            ], StatResultsService);
            /***/ 
        }),
        /***/ "./src/app/stat-results/stat-results.component.css": 
        /*!*********************************************************!*\
          !*** ./src/app/stat-results/stat-results.component.css ***!
          \*********************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n\nth:hover {\n    cursor: pointer;\n  }\n\n  .trhover:hover {\n    background-color: #cfcfcf;\n  }\n\n  .mat-sort-header-container {\n    align-items: center;\n  }\n\n  .vertical-alignemnt td,\n  .vertical-alignemnt th {\n    vertical-align: middle;;\n  }\n\n  .red {\n    background-color: red; \n}\n\n  .black {\n  background-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdC1yZXN1bHRzL3N0YXQtcmVzdWx0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UseUJBQXlCO0VBQzNCOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBOztJQUVFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLHFCQUFxQjtBQUN6Qjs7RUFFQTtFQUNFLHVCQUF1QjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL3N0YXQtcmVzdWx0cy9zdGF0LXJlc3VsdHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG50aDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgLnRyaG92ZXI6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjZmNmY2Y7XG4gIH1cblxuICAubWF0LXNvcnQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC52ZXJ0aWNhbC1hbGlnbmVtbnQgdGQsXG4gIC52ZXJ0aWNhbC1hbGlnbmVtbnQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7O1xuICB9XG5cbiAgLnJlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkOyBcbn1cblxuLmJsYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59Il19 */");
            /***/ 
        }),
        /***/ "./src/app/stat-results/stat-results.component.ts": 
        /*!********************************************************!*\
          !*** ./src/app/stat-results/stat-results.component.ts ***!
          \********************************************************/
        /*! exports provided: StatResultsComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatResultsComponent", function () { return StatResultsComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _stat_results_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stat-results.service */ "./src/app/stat-results.service.ts");
            /* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
            var ELEMENT_DATA = [
                { liga: 1, equipa_casa: 'Hydrogen', equipa_fora: 1.0079, over15validation: 'H' },
                { liga: 2, equipa_casa: 'Helium', equipa_fora: 4.0026, over15validation: 'He' },
                { liga: 3, equipa_casa: 'Lithium', equipa_fora: 6.941, over15validation: 'Li' },
                { liga: 4, equipa_casa: 'Beryllium', equipa_fora: 9.0122, over15validation: 'Be' },
                { liga: 5, equipa_casa: 'Boron', equipa_fora: 10.811, over15validation: 'B' },
                { liga: 6, equipa_casa: 'Carbon', equipa_fora: 12.0107, over15validation: 'C' },
                { liga: 7, equipa_casa: 'Nitrogen', equipa_fora: 14.0067, over15validation: 'N' },
                { liga: 8, equipa_casa: 'Oxygen', equipa_fora: 15.9994, over15validation: 'O' },
                { liga: 9, equipa_casa: 'Fluorine', equipa_fora: 18.9984, over15validation: 'F' },
                { liga: 10, equipa_casa: 'Neon', equipa_fora: 20.1797, over15validation: 'Ne' },
            ];
            var StatResultsComponent = /** @class */ (function () {
                function StatResultsComponent(statResultsService) {
                    this.statResultsService = statResultsService;
                    /*displayedColumns: string[] = ['liga', 'equipaCasa.nomeEquipa',
                    'equipaFora.nomeEquipa', 'over15validation', 'over15standardDeviation',
                    'over25validation', 'over25standardDeviation', 'over35validation', 'over35standardDeviation',
                    'goalsScoredPlusConceded', 'gameResult', 'gameStatus'];*/
                    this.displayedColumns = ['liga', 'equipaCasa.nomeEquipa',
                        'equipaFora.nomeEquipa',
                        'over25validation', 'over25standardDeviation', 'over35validation', 'over35standardDeviation',
                        'medgolcasa4', 'medsofrcasa4', 'medgolfora4', 'medsofrfora4',
                        'goalsScoredPlusConceded', 'gameResult', 'gameStatus'];
                    this.listaJogosAnalisados = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"]();
                    this.dataFutura = true;
                    this.varaivel = false;
                }
                Object.defineProperty(StatResultsComponent.prototype, "matSort", {
                    set: function (ms) {
                        this.sort = ms;
                        this.setDataSourceAttributes();
                    },
                    enumerable: true,
                    configurable: true
                });
                StatResultsComponent.prototype.ngOnInit = function () {
                };
                StatResultsComponent.prototype.getListaDeJogosAnalisados = function (data_pesquisa) {
                    var _this = this;
                    this.statResultsService.getListaJogosAnalisados(data_pesquisa)
                        .subscribe(function (listaJogosAnalisados) {
                        _this.listaJogosAnalisados.data = listaJogosAnalisados.data;
                        console.log(_this.sort);
                    });
                };
                StatResultsComponent.prototype.addEvent = function (type, event) {
                    console.log("sdffsef");
                    if (event.value.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
                        this.dataFutura = false;
                    }
                    else {
                        this.dataFutura = true;
                    }
                    this.getListaDeJogosAnalisados(event.value);
                };
                StatResultsComponent.prototype.setDataSourceAttributes = function () {
                    this.listaJogosAnalisados.sort = this.sort;
                };
                return StatResultsComponent;
            }());
            StatResultsComponent.ctorParameters = function () { return [
                { type: _stat_results_service__WEBPACK_IMPORTED_MODULE_2__["StatResultsService"] }
            ]; };
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: false })
            ], StatResultsComponent.prototype, "matSort", null);
            StatResultsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-stat-results',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./stat-results.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/stat-results/stat-results.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./stat-results.component.css */ "./src/app/stat-results/stat-results.component.css")).default]
                })
            ], StatResultsComponent);
            /***/ 
        }),
        /***/ "./src/environments/environment.ts": 
        /*!*****************************************!*\
          !*** ./src/environments/environment.ts ***!
          \*****************************************/
        /*! exports provided: environment */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function () { return environment; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            // This file can be replaced during build by using the `fileReplacements` array.
            // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
            // The list of file replacements can be found in `angular.json`.
            var environment = {
                production: false,
                apiUrl: 'http://localhost:3000/api/v1'
            };
            /*
             * For easier debugging in development mode, you can import the following file
             * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
             *
             * This import should be commented out in production mode because it will have a negative impact
             * on performance if an error is thrown.
             */
            // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
            /***/ 
        }),
        /***/ "./src/main.ts": 
        /*!*********************!*\
          !*** ./src/main.ts ***!
          \*********************/
        /*! no exports provided */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
            /* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
            /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
            }
            Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
                .catch(function (err) { return console.error(err); });
            /***/ 
        }),
        /***/ 0: 
        /*!***************************!*\
          !*** multi ./src/main.ts ***!
          \***************************/
        /*! no static exports found */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = __webpack_require__(/*! /Users/vviana/projects/personal/soccer-stats-bot/Crawler_Frontend/src/main.ts */ "./src/main.ts");
            /***/ 
        })
    }, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
//# sourceMappingURL=main-es5.js.map
//# sourceMappingURL=main-es5.js.map