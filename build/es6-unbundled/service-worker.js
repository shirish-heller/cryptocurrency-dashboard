/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/chart.js/dist/Chart.js","0d94bc1e446cb86e5672c21fbde68a76"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","7e459d599801c582676534c6d03a4b13"],["bower_components/iron-ajax/iron-ajax.html","b043a4291635f4ed2aad922c384e2782"],["bower_components/iron-ajax/iron-request.html","4e583341a7965c06438b5c74171baba8"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["bower_components/iron-flex-layout/iron-flex-layout.html","03e6f060e1a174a51cc599efac9de802"],["bower_components/moment/moment.js","759615b93f1edc93346c5c41c6a0fe7d"],["bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["bower_components/paper-behaviors/paper-ripple-behavior.html","d865b73dbb028c24ed30c47da4a3e8fe"],["bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["bower_components/paper-ripple/paper-ripple.html","0c89f5d6aec27fa86d0a5422dae34099"],["bower_components/paper-spinner/paper-spinner-behavior.html","46ef5ac786242c29920edbff151343cd"],["bower_components/paper-spinner/paper-spinner-lite.html","ca31c3057d0af1d0ccca77134e2f837c"],["bower_components/paper-spinner/paper-spinner-styles.html","7a7e3975c31540dd209e69d7b9cb7ac0"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/paper-styles.html","3a86674df8b40032fc42fe95649bbec6"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/paper-toolbar/paper-toolbar.html","52157b2b71f3fed07a6dc8de5442eef1"],["bower_components/polymer/lib/elements/array-selector.html","52e8ccf3909fdd0f9419e9774d2ca0a7"],["bower_components/polymer/lib/elements/custom-style.html","f40bf2a4b73a468b95ae479828a3dc5a"],["bower_components/polymer/lib/elements/dom-bind.html","0d93f7a399636f6cf6ebad294794304e"],["bower_components/polymer/lib/elements/dom-if.html","42bd24d5b4fb742b2e889bdaf7de0123"],["bower_components/polymer/lib/elements/dom-module.html","5da507765615f5c123d0efd6c0ee2b26"],["bower_components/polymer/lib/elements/dom-repeat.html","518834bcc7fee13e2e02b85a7b2c7d10"],["bower_components/polymer/lib/legacy/class.html","4ba6bb406bd899376a4c9af525d92a77"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","70df13315aefb7e89bf35414f9f4ee2d"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","61308a9cc1b2cd07bdd49037c643f677"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","1591777a3be67b598828f7c8cc9b7dcf"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","5a2d1489b25cbcfc0ff535ed9c3b7652"],["bower_components/polymer/lib/mixins/dir-mixin.html","37c54da92010eb75da55564f2a0b6550"],["bower_components/polymer/lib/mixins/element-mixin.html","2fc071522b613c1b9b3ad5603ee9c89d"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","38c200c539ed88933dbe5bbba675f9a4"],["bower_components/polymer/lib/mixins/mutable-data.html","ae5b34cdf84154794087778b40b70b53"],["bower_components/polymer/lib/mixins/property-accessors.html","ab4ec928a215b43a9ee1e4abeb61d840"],["bower_components/polymer/lib/mixins/property-effects.html","43bdf8293189c2669bab67adc2a92fbb"],["bower_components/polymer/lib/mixins/template-stamp.html","2eb71f1f90a4ddb27e31abb407d63363"],["bower_components/polymer/lib/utils/array-splice.html","ed2dff64e9ee2459f197c4b5dfa40d55"],["bower_components/polymer/lib/utils/async.html","cfcef147bd7038f9bc9f93723a8becc6"],["bower_components/polymer/lib/utils/boot.html","ddbfb0d5a025990bf06885bb2a31b459"],["bower_components/polymer/lib/utils/case-map.html","3688b5ebabbe0f08a45d3041d15992d7"],["bower_components/polymer/lib/utils/debounce.html","15487e936eb37101e328bc4ea01733f7"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","fe4ed52ab5eb3a1163b60fe98cafe4a5"],["bower_components/polymer/lib/utils/flush.html","816191b9a81240311f51d0a02ac54fbe"],["bower_components/polymer/lib/utils/gestures.html","6e26471677802afb1463b666f45649c7"],["bower_components/polymer/lib/utils/import-href.html","d235b50f7364ad24853e388c0e47235a"],["bower_components/polymer/lib/utils/mixin.html","ca3a32aca09b6135bd17636d93b649cf"],["bower_components/polymer/lib/utils/path.html","5ce25fdab968f4c908a04b457059589d"],["bower_components/polymer/lib/utils/render-status.html","92d5cab79f72fe11c7dfe9f503f58e09"],["bower_components/polymer/lib/utils/resolve-url.html","17c2ea102916e990c83f1530fc8d7738"],["bower_components/polymer/lib/utils/settings.html","c97b6a7e2375492073255c6fe52b8ef8"],["bower_components/polymer/lib/utils/style-gather.html","9a460886072e6590d4e24dbed482dfac"],["bower_components/polymer/lib/utils/templatize.html","7959b8bfbe64bc85851a672b8fca5c54"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","996204e3caf0fd21a4d0b39bd4cbab17"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","6e2cb1745040846fe648378e542eeb62"],["bower_components/webcomponentsjs/webcomponents-lite.js","7e4ad38bd3dd9be9f97b5b43d98553a4"],["crypto-dash.html","863af195ae04548dc112062657cff929"],["index.html","6460143210361ebcb08c87b37bf7cbd7"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







