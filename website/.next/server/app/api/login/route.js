"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/login/route";
exports.ids = ["app/api/login/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/login/route.js */ \"(rsc)/./app/api/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/route\",\n        pathname: \"/api/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/route\"\n    },\n    resolvedPagePath: \"/app/app/api/login/route.js\",\n    nextConfigOutput,\n    userland: _app_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj0lMkZhcHAlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDckI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJzaXRlLz9mOGNiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9hcHAvYXBwL2FwaS9sb2dpbi9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvYXBwL2FwcC9hcGkvbG9naW4vcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2xvZ2luL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/login/route.js":
/*!********************************!*\
  !*** ./app/api/login/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\n\nasync function POST(request) {\n    try {\n        const { email, password } = await request.json();\n        // Consultando o usuário no PostgreSQL\n        const client = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].connect();\n        const result = await client.query(\"SELECT * FROM acessos.usuarios WHERE email = $1\", [\n            email\n        ]);\n        client.release();\n        if (result.rows.length === 0) {\n            return Response.json({\n                error: \"Usu\\xe1rio n\\xe3o encontrado.\"\n            }, {\n                status: 401\n            });\n        }\n        const user = result.rows[0];\n        // Comparação do hash bcrypt\n        const match = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(password, user.senha_hash);\n        if (match) {\n            // Cria o cookie de sessão para o usuário logado\n            const sessionData = {\n                id: user.id,\n                nome: user.nome,\n                email: user.email\n            };\n            (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)().set(\"cvmc_session\", Buffer.from(JSON.stringify(sessionData)).toString(\"base64\"), {\n                httpOnly: true,\n                secure: \"development\" === \"production\",\n                maxAge: 60 * 60 * 24,\n                path: \"/\"\n            });\n            return Response.json({\n                success: true,\n                user: sessionData\n            }, {\n                status: 200\n            });\n        } else {\n            return Response.json({\n                error: \"Senha incorreta.\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (err) {\n        console.error(\"Erro na API de Login:\", err);\n        return Response.json({\n            error: \"Erro interno no servidor ao tentar se conectar ao banco de dados.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvZ2luL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTRCO0FBQ0U7QUFDUztBQUVoQyxlQUFlRyxLQUFLQyxPQUFPO0lBQ2hDLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUYsUUFBUUcsSUFBSTtRQUU5QyxzQ0FBc0M7UUFDdEMsTUFBTUMsU0FBUyxNQUFNUiwrQ0FBSUEsQ0FBQ1MsT0FBTztRQUNqQyxNQUFNQyxTQUFTLE1BQU1GLE9BQU9HLEtBQUssQ0FBQyxtREFBbUQ7WUFBQ047U0FBTTtRQUM1RkcsT0FBT0ksT0FBTztRQUVkLElBQUlGLE9BQU9HLElBQUksQ0FBQ0MsTUFBTSxLQUFLLEdBQUc7WUFDNUIsT0FBT0MsU0FBU1IsSUFBSSxDQUFDO2dCQUFFUyxPQUFPO1lBQTBCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUMzRTtRQUVBLE1BQU1DLE9BQU9SLE9BQU9HLElBQUksQ0FBQyxFQUFFO1FBRTNCLDRCQUE0QjtRQUM1QixNQUFNTSxRQUFRLE1BQU1sQix1REFBYyxDQUFDSyxVQUFVWSxLQUFLRyxVQUFVO1FBRTVELElBQUlGLE9BQU87WUFDVCxnREFBZ0Q7WUFDaEQsTUFBTUcsY0FBYztnQkFBRUMsSUFBSUwsS0FBS0ssRUFBRTtnQkFBRUMsTUFBTU4sS0FBS00sSUFBSTtnQkFBRW5CLE9BQU9hLEtBQUtiLEtBQUs7WUFBQztZQUN0RUgscURBQU9BLEdBQUd1QixHQUFHLENBQUMsZ0JBQWdCQyxPQUFPQyxJQUFJLENBQUNDLEtBQUtDLFNBQVMsQ0FBQ1AsY0FBY1EsUUFBUSxDQUFDLFdBQVc7Z0JBQ3pGQyxVQUFVO2dCQUNWQyxRQUFRQyxrQkFBeUI7Z0JBQ2pDQyxRQUFRLEtBQUssS0FBSztnQkFDbEJDLE1BQU07WUFDUjtZQUVBLE9BQU9wQixTQUFTUixJQUFJLENBQUM7Z0JBQUU2QixTQUFTO2dCQUFNbEIsTUFBTUk7WUFBWSxHQUFHO2dCQUFFTCxRQUFRO1lBQUk7UUFDM0UsT0FBTztZQUNMLE9BQU9GLFNBQVNSLElBQUksQ0FBQztnQkFBRVMsT0FBTztZQUFtQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7SUFDRixFQUFFLE9BQU9vQixLQUFLO1FBQ1pDLFFBQVF0QixLQUFLLENBQUMseUJBQXlCcUI7UUFDdkMsT0FBT3RCLFNBQVNSLElBQUksQ0FBQztZQUFFUyxPQUFPO1FBQW9FLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JIO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJzaXRlLy4vYXBwL2FwaS9sb2dpbi9yb3V0ZS5qcz83YThlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwb29sIGZyb20gJ0AvbGliL2RiJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG5cbiAgICAvLyBDb25zdWx0YW5kbyBvIHVzdcOhcmlvIG5vIFBvc3RncmVTUUxcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoJ1NFTEVDVCAqIEZST00gYWNlc3Nvcy51c3VhcmlvcyBXSEVSRSBlbWFpbCA9ICQxJywgW2VtYWlsXSk7XG4gICAgY2xpZW50LnJlbGVhc2UoKTtcblxuICAgIGlmIChyZXN1bHQucm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVc3XDoXJpbyBuw6NvIGVuY29udHJhZG8uJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSByZXN1bHQucm93c1swXTtcbiAgICBcbiAgICAvLyBDb21wYXJhw6fDo28gZG8gaGFzaCBiY3J5cHRcbiAgICBjb25zdCBtYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnNlbmhhX2hhc2gpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAvLyBDcmlhIG8gY29va2llIGRlIHNlc3PDo28gcGFyYSBvIHVzdcOhcmlvIGxvZ2Fkb1xuICAgICAgY29uc3Qgc2Vzc2lvbkRhdGEgPSB7IGlkOiB1c2VyLmlkLCBub21lOiB1c2VyLm5vbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH07XG4gICAgICBjb29raWVzKCkuc2V0KCdjdm1jX3Nlc3Npb24nLCBCdWZmZXIuZnJvbShKU09OLnN0cmluZ2lmeShzZXNzaW9uRGF0YSkpLnRvU3RyaW5nKCdiYXNlNjQnKSwge1xuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCwgLy8gMSBkaWEgbG9nYWRvXG4gICAgICAgIHBhdGg6ICcvJ1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdXNlcjogc2Vzc2lvbkRhdGEgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1NlbmhhIGluY29ycmV0YS4nIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIG5hIEFQSSBkZSBMb2dpbjonLCBlcnIpO1xuICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvIGludGVybm8gbm8gc2Vydmlkb3IgYW8gdGVudGFyIHNlIGNvbmVjdGFyIGFvIGJhbmNvIGRlIGRhZG9zLicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInBvb2wiLCJiY3J5cHQiLCJjb29raWVzIiwiUE9TVCIsInJlcXVlc3QiLCJlbWFpbCIsInBhc3N3b3JkIiwianNvbiIsImNsaWVudCIsImNvbm5lY3QiLCJyZXN1bHQiLCJxdWVyeSIsInJlbGVhc2UiLCJyb3dzIiwibGVuZ3RoIiwiUmVzcG9uc2UiLCJlcnJvciIsInN0YXR1cyIsInVzZXIiLCJtYXRjaCIsImNvbXBhcmUiLCJzZW5oYV9oYXNoIiwic2Vzc2lvbkRhdGEiLCJpZCIsIm5vbWUiLCJzZXQiLCJCdWZmZXIiLCJmcm9tIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvU3RyaW5nIiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwcm9jZXNzIiwibWF4QWdlIiwicGF0aCIsInN1Y2Nlc3MiLCJlcnIiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/login/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n\nlet pool;\nif (!pool) {\n    pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n        user: process.env.DB_USER || \"postgres\",\n        password: process.env.DB_PASSWORD || \"postgres\",\n        host: process.env.DB_HOST || \"localhost\",\n        port: process.env.DB_PORT || 5432,\n        database: process.env.DB_NAME || \"cvmc_db\"\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBRTFCLElBQUlDO0FBRUosSUFBSSxDQUFDQSxNQUFNO0lBQ1RBLE9BQU8sSUFBSUQsb0NBQUlBLENBQUM7UUFDZEUsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxPQUFPLElBQUk7UUFDN0JDLFVBQVVILFFBQVFDLEdBQUcsQ0FBQ0csV0FBVyxJQUFJO1FBQ3JDQyxNQUFNTCxRQUFRQyxHQUFHLENBQUNLLE9BQU8sSUFBSTtRQUM3QkMsTUFBTVAsUUFBUUMsR0FBRyxDQUFDTyxPQUFPLElBQUk7UUFDN0JDLFVBQVVULFFBQVFDLEdBQUcsQ0FBQ1MsT0FBTyxJQUFJO0lBQ25DO0FBQ0Y7QUFFQSxpRUFBZVosSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnNpdGUvLi9saWIvZGIuanM/M2RjOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xuXG5sZXQgcG9vbDtcblxuaWYgKCFwb29sKSB7XG4gIHBvb2wgPSBuZXcgUG9vbCh7XG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuREJfVVNFUiB8fCAncG9zdGdyZXMnLFxuICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5EQl9QQVNTV09SRCB8fCAncG9zdGdyZXMnLFxuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgJ2xvY2FsaG9zdCcsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuREJfUE9SVCB8fCA1NDMyLFxuICAgIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5EQl9OQU1FIHx8ICdjdm1jX2RiJyxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvb2w7XG4iXSwibmFtZXMiOlsiUG9vbCIsInBvb2wiLCJ1c2VyIiwicHJvY2VzcyIsImVudiIsIkRCX1VTRVIiLCJwYXNzd29yZCIsIkRCX1BBU1NXT1JEIiwiaG9zdCIsIkRCX0hPU1QiLCJwb3J0IiwiREJfUE9SVCIsImRhdGFiYXNlIiwiREJfTkFNRSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();