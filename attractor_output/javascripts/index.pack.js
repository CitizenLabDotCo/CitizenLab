!(function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, 'a', e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ''),
    n((n.s = 73));
})([
  function (t, e, n) {
    'use strict';
    t.exports = n(58);
  },
  function (t, e, n) {
    t.exports = n(69)();
  },
  function (t, e, n) {
    var r = n(62),
      i = n(63),
      a = n(64);
    t.exports = function (t, e) {
      return r(t) || i(t, e) || a();
    };
  },
  function (t, e, n) {
    t.exports = n(65);
  },
  ,
  function (t, e) {
    function n(t, e, n, r, i, a, o) {
      try {
        var l = t[a](o),
          u = l.value;
      } catch (t) {
        return void n(t);
      }
      l.done ? e(u) : Promise.resolve(u).then(r, i);
    }
    t.exports = function (t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (i, a) {
          var o = t.apply(e, r);
          function l(t) {
            n(o, i, a, l, u, 'next', t);
          }
          function u(t) {
            n(o, i, a, l, u, 'throw', t);
          }
          l(void 0);
        });
      };
    };
  },
  ,
  ,
  function (t, e) {
    function n() {
      return (
        (t.exports = n =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          }),
        n.apply(this, arguments)
      );
    }
    t.exports = n;
  },
  ,
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (t) {
      'object' == typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    'use strict';
    (function (t, r) {
      function i(t) {
        return (i =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t;
              })(t);
      }
      function a(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function o(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function l(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          'function' == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              o(t, e, n[e]);
            });
        }
        return t;
      }
      function u(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n = [],
              r = !0,
              i = !1,
              a = void 0;
            try {
              for (
                var o, l = t[Symbol.iterator]();
                !(r = (o = l.next()).done) &&
                (n.push(o.value), !e || n.length !== e);
                r = !0
              );
            } catch (t) {
              (i = !0), (a = t);
            } finally {
              try {
                r || null == l.return || l.return();
              } finally {
                if (i) throw a;
              }
            }
            return n;
          })(t, e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance'
            );
          })()
        );
      }
      n.d(e, 'a', function () {
        return Lt;
      }),
        n.d(e, 'b', function () {
          return At;
        });
      var s = function () {},
        c = {},
        f = {},
        h = { mark: s, measure: s };
      try {
        'undefined' != typeof window && (c = window),
          'undefined' != typeof document && (f = document),
          'undefined' != typeof MutationObserver && MutationObserver,
          'undefined' != typeof performance && (h = performance);
      } catch (t) {}
      var p = (c.navigator || {}).userAgent,
        d = void 0 === p ? '' : p,
        m = c,
        y = f,
        v = h,
        g =
          (m.document,
          !!y.documentElement &&
            !!y.head &&
            'function' == typeof y.addEventListener &&
            'function' == typeof y.createElement),
        _ = (~d.indexOf('MSIE') || d.indexOf('Trident/'), 'fa'),
        b = 'svg-inline--fa',
        w = 'data-fa-i2svg',
        x =
          ((function () {
            try {
            } catch (t) {
              return !1;
            }
          })(),
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        k = x.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        E = {
          GROUP: 'group',
          SWAP_OPACITY: 'swap-opacity',
          PRIMARY: 'primary',
          SECONDARY: 'secondary',
        },
        T =
          ([
            'xs',
            'sm',
            'lg',
            'fw',
            'ul',
            'li',
            'border',
            'pull-left',
            'pull-right',
            'spin',
            'pulse',
            'rotate-90',
            'rotate-180',
            'rotate-270',
            'flip-horizontal',
            'flip-vertical',
            'flip-both',
            'stack',
            'stack-1x',
            'stack-2x',
            'inverse',
            'layers',
            'layers-text',
            'layers-counter',
            E.GROUP,
            E.SWAP_OPACITY,
            E.PRIMARY,
            E.SECONDARY,
          ]
            .concat(
              x.map(function (t) {
                return ''.concat(t, 'x');
              })
            )
            .concat(
              k.map(function (t) {
                return 'w-'.concat(t);
              })
            ),
          m.FontAwesomeConfig || {});
      if (y && 'function' == typeof y.querySelector) {
        [
          ['data-family-prefix', 'familyPrefix'],
          ['data-replacement-class', 'replacementClass'],
          ['data-auto-replace-svg', 'autoReplaceSvg'],
          ['data-auto-add-css', 'autoAddCss'],
          ['data-auto-a11y', 'autoA11y'],
          ['data-search-pseudo-elements', 'searchPseudoElements'],
          ['data-observe-mutations', 'observeMutations'],
          ['data-mutate-approach', 'mutateApproach'],
          ['data-keep-original-source', 'keepOriginalSource'],
          ['data-measure-performance', 'measurePerformance'],
          ['data-show-missing-icons', 'showMissingIcons'],
        ].forEach(function (t) {
          var e = u(t, 2),
            n = e[0],
            r = e[1],
            i = (function (t) {
              return '' === t || ('false' !== t && ('true' === t || t));
            })(
              (function (t) {
                var e = y.querySelector('script[' + t + ']');
                if (e) return e.getAttribute(t);
              })(n)
            );
          null != i && (T[r] = i);
        });
      }
      var S = l(
        {},
        {
          familyPrefix: _,
          replacementClass: b,
          autoReplaceSvg: !0,
          autoAddCss: !0,
          autoA11y: !0,
          searchPseudoElements: !1,
          observeMutations: !0,
          mutateApproach: 'async',
          keepOriginalSource: !0,
          measurePerformance: !1,
          showMissingIcons: !0,
        },
        T
      );
      S.autoReplaceSvg || (S.observeMutations = !1);
      var C = l({}, S);
      m.FontAwesomeConfig = C;
      var M = m || {};
      M.___FONT_AWESOME___ || (M.___FONT_AWESOME___ = {}),
        M.___FONT_AWESOME___.styles || (M.___FONT_AWESOME___.styles = {}),
        M.___FONT_AWESOME___.hooks || (M.___FONT_AWESOME___.hooks = {}),
        M.___FONT_AWESOME___.shims || (M.___FONT_AWESOME___.shims = []);
      var N = M.___FONT_AWESOME___,
        P = [];
      g &&
        ((y.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
          y.readyState
        ) ||
          y.addEventListener('DOMContentLoaded', function t() {
            y.removeEventListener('DOMContentLoaded', t),
              1,
              P.map(function (t) {
                return t();
              });
          }));
      var O,
        A = 'pending',
        L = 'settled',
        R = 'fulfilled',
        F = 'rejected',
        z = function () {},
        I =
          void 0 !== t &&
          void 0 !== t.process &&
          'function' == typeof t.process.emit,
        j = void 0 === r ? setTimeout : r,
        U = [];
      function D() {
        for (var t = 0; t < U.length; t++) U[t][0](U[t][1]);
        (U = []), (O = !1);
      }
      function H(t, e) {
        U.push([t, e]), O || ((O = !0), j(D, 0));
      }
      function W(t) {
        var e = t.owner,
          n = e._state,
          r = e._data,
          i = t[n],
          a = t.then;
        if ('function' == typeof i) {
          n = R;
          try {
            r = i(r);
          } catch (t) {
            q(a, t);
          }
        }
        $(a, r) || (n === R && Y(a, r), n === F && q(a, r));
      }
      function $(t, e) {
        var n;
        try {
          if (t === e)
            throw new TypeError(
              'A promises callback cannot return that same promise.'
            );
          if (e && ('function' == typeof e || 'object' === i(e))) {
            var r = e.then;
            if ('function' == typeof r)
              return (
                r.call(
                  e,
                  function (r) {
                    n || ((n = !0), e === r ? B(t, r) : Y(t, r));
                  },
                  function (e) {
                    n || ((n = !0), q(t, e));
                  }
                ),
                !0
              );
          }
        } catch (e) {
          return n || q(t, e), !0;
        }
        return !1;
      }
      function Y(t, e) {
        (t !== e && $(t, e)) || B(t, e);
      }
      function B(t, e) {
        t._state === A && ((t._state = L), (t._data = e), H(X, t));
      }
      function q(t, e) {
        t._state === A && ((t._state = L), (t._data = e), H(Q, t));
      }
      function V(t) {
        t._then = t._then.forEach(W);
      }
      function X(t) {
        (t._state = R), V(t);
      }
      function Q(e) {
        (e._state = F),
          V(e),
          !e._handled && I && t.process.emit('unhandledRejection', e._data, e);
      }
      function K(e) {
        t.process.emit('rejectionHandled', e);
      }
      function G(t) {
        if ('function' != typeof t)
          throw new TypeError('Promise resolver ' + t + ' is not a function');
        if (this instanceof G == !1)
          throw new TypeError(
            "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
          );
        (this._then = []),
          (function (t, e) {
            function n(t) {
              q(e, t);
            }
            try {
              t(function (t) {
                Y(e, t);
              }, n);
            } catch (t) {
              n(t);
            }
          })(t, this);
      }
      (G.prototype = {
        constructor: G,
        _state: A,
        _then: null,
        _data: void 0,
        _handled: !1,
        then: function (t, e) {
          var n = {
            owner: this,
            then: new this.constructor(z),
            fulfilled: t,
            rejected: e,
          };
          return (
            (!e && !t) ||
              this._handled ||
              ((this._handled = !0), this._state === F && I && H(K, this)),
            this._state === R || this._state === F
              ? H(W, n)
              : this._then.push(n),
            n.then
          );
        },
        catch: function (t) {
          return this.then(null, t);
        },
      }),
        (G.all = function (t) {
          if (!Array.isArray(t))
            throw new TypeError('You must pass an array to Promise.all().');
          return new G(function (e, n) {
            var r = [],
              i = 0;
            function a(t) {
              return (
                i++,
                function (n) {
                  (r[t] = n), --i || e(r);
                }
              );
            }
            for (var o, l = 0; l < t.length; l++)
              (o = t[l]) && 'function' == typeof o.then
                ? o.then(a(l), n)
                : (r[l] = o);
            i || e(r);
          });
        }),
        (G.race = function (t) {
          if (!Array.isArray(t))
            throw new TypeError('You must pass an array to Promise.race().');
          return new G(function (e, n) {
            for (var r, i = 0; i < t.length; i++)
              (r = t[i]) && 'function' == typeof r.then ? r.then(e, n) : e(r);
          });
        }),
        (G.resolve = function (t) {
          return t && 'object' === i(t) && t.constructor === G
            ? t
            : new G(function (e) {
                e(t);
              });
        }),
        (G.reject = function (t) {
          return new G(function (e, n) {
            n(t);
          });
        });
      'function' == typeof Promise && Promise;
      var Z = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
      function J(t) {
        if (t && g) {
          var e = y.createElement('style');
          e.setAttribute('type', 'text/css'), (e.innerHTML = t);
          for (
            var n = y.head.childNodes, r = null, i = n.length - 1;
            i > -1;
            i--
          ) {
            var a = n[i],
              o = (a.tagName || '').toUpperCase();
            ['STYLE', 'LINK'].indexOf(o) > -1 && (r = a);
          }
          return y.head.insertBefore(e, r), t;
        }
      }
      var tt = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      function et() {
        for (var t = 12, e = ''; t-- > 0; ) e += tt[(62 * Math.random()) | 0];
        return e;
      }
      function nt(t) {
        return ''
          .concat(t)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      function rt(t) {
        return Object.keys(t || {}).reduce(function (e, n) {
          return e + ''.concat(n, ': ').concat(t[n], ';');
        }, '');
      }
      function it(t) {
        return (
          t.size !== Z.size ||
          t.x !== Z.x ||
          t.y !== Z.y ||
          t.rotate !== Z.rotate ||
          t.flipX ||
          t.flipY
        );
      }
      function at(t) {
        var e = t.transform,
          n = t.containerWidth,
          r = t.iconWidth,
          i = { transform: 'translate('.concat(n / 2, ' 256)') },
          a = 'translate('.concat(32 * e.x, ', ').concat(32 * e.y, ') '),
          o = 'scale('
            .concat((e.size / 16) * (e.flipX ? -1 : 1), ', ')
            .concat((e.size / 16) * (e.flipY ? -1 : 1), ') '),
          l = 'rotate('.concat(e.rotate, ' 0 0)');
        return {
          outer: i,
          inner: { transform: ''.concat(a, ' ').concat(o, ' ').concat(l) },
          path: { transform: 'translate('.concat((r / 2) * -1, ' -256)') },
        };
      }
      var ot = { x: 0, y: 0, width: '100%', height: '100%' };
      function lt(t) {
        var e =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return (
          t.attributes &&
            (t.attributes.fill || e) &&
            (t.attributes.fill = 'black'),
          t
        );
      }
      function ut(t) {
        var e = t.icons,
          n = e.main,
          r = e.mask,
          i = t.prefix,
          a = t.iconName,
          o = t.transform,
          u = t.symbol,
          s = t.title,
          c = t.extra,
          f = t.watchable,
          h = void 0 !== f && f,
          p = r.found ? r : n,
          d = p.width,
          m = p.height,
          y = 'fa-w-'.concat(Math.ceil((d / m) * 16)),
          v = [
            C.replacementClass,
            a ? ''.concat(C.familyPrefix, '-').concat(a) : '',
            y,
          ]
            .filter(function (t) {
              return -1 === c.classes.indexOf(t);
            })
            .concat(c.classes)
            .join(' '),
          g = {
            children: [],
            attributes: l({}, c.attributes, {
              'data-prefix': i,
              'data-icon': a,
              class: v,
              role: c.attributes.role || 'img',
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 '.concat(d, ' ').concat(m),
            }),
          };
        h && (g.attributes[w] = ''),
          s &&
            g.children.push({
              tag: 'title',
              attributes: {
                id: g.attributes['aria-labelledby'] || 'title-'.concat(et()),
              },
              children: [s],
            });
        var _ = l({}, g, {
            prefix: i,
            iconName: a,
            main: n,
            mask: r,
            transform: o,
            symbol: u,
            styles: c.styles,
          }),
          b =
            r.found && n.found
              ? (function (t) {
                  var e,
                    n = t.children,
                    r = t.attributes,
                    i = t.main,
                    a = t.mask,
                    o = t.transform,
                    u = i.width,
                    s = i.icon,
                    c = a.width,
                    f = a.icon,
                    h = at({ transform: o, containerWidth: c, iconWidth: u }),
                    p = {
                      tag: 'rect',
                      attributes: l({}, ot, { fill: 'white' }),
                    },
                    d = s.children ? { children: s.children.map(lt) } : {},
                    m = {
                      tag: 'g',
                      attributes: l({}, h.inner),
                      children: [
                        lt(
                          l(
                            {
                              tag: s.tag,
                              attributes: l({}, s.attributes, h.path),
                            },
                            d
                          )
                        ),
                      ],
                    },
                    y = { tag: 'g', attributes: l({}, h.outer), children: [m] },
                    v = 'mask-'.concat(et()),
                    g = 'clip-'.concat(et()),
                    _ = {
                      tag: 'mask',
                      attributes: l({}, ot, {
                        id: v,
                        maskUnits: 'userSpaceOnUse',
                        maskContentUnits: 'userSpaceOnUse',
                      }),
                      children: [p, y],
                    },
                    b = {
                      tag: 'defs',
                      children: [
                        {
                          tag: 'clipPath',
                          attributes: { id: g },
                          children: ((e = f), 'g' === e.tag ? e.children : [e]),
                        },
                        _,
                      ],
                    };
                  return (
                    n.push(b, {
                      tag: 'rect',
                      attributes: l(
                        {
                          fill: 'currentColor',
                          'clip-path': 'url(#'.concat(g, ')'),
                          mask: 'url(#'.concat(v, ')'),
                        },
                        ot
                      ),
                    }),
                    { children: n, attributes: r }
                  );
                })(_)
              : (function (t) {
                  var e = t.children,
                    n = t.attributes,
                    r = t.main,
                    i = t.transform,
                    a = rt(t.styles);
                  if ((a.length > 0 && (n.style = a), it(i))) {
                    var o = at({
                      transform: i,
                      containerWidth: r.width,
                      iconWidth: r.width,
                    });
                    e.push({
                      tag: 'g',
                      attributes: l({}, o.outer),
                      children: [
                        {
                          tag: 'g',
                          attributes: l({}, o.inner),
                          children: [
                            {
                              tag: r.icon.tag,
                              children: r.icon.children,
                              attributes: l({}, r.icon.attributes, o.path),
                            },
                          ],
                        },
                      ],
                    });
                  } else e.push(r.icon);
                  return { children: e, attributes: n };
                })(_),
          x = b.children,
          k = b.attributes;
        return (
          (_.children = x),
          (_.attributes = k),
          u
            ? (function (t) {
                var e = t.prefix,
                  n = t.iconName,
                  r = t.children,
                  i = t.attributes,
                  a = t.symbol;
                return [
                  {
                    tag: 'svg',
                    attributes: { style: 'display: none;' },
                    children: [
                      {
                        tag: 'symbol',
                        attributes: l({}, i, {
                          id:
                            !0 === a
                              ? ''
                                  .concat(e, '-')
                                  .concat(C.familyPrefix, '-')
                                  .concat(n)
                              : a,
                        }),
                        children: r,
                      },
                    ],
                  },
                ];
              })(_)
            : (function (t) {
                var e = t.children,
                  n = t.main,
                  r = t.mask,
                  i = t.attributes,
                  a = t.styles,
                  o = t.transform;
                if (it(o) && n.found && !r.found) {
                  var u = { x: n.width / n.height / 2, y: 0.5 };
                  i.style = rt(
                    l({}, a, {
                      'transform-origin': ''
                        .concat(u.x + o.x / 16, 'em ')
                        .concat(u.y + o.y / 16, 'em'),
                    })
                  );
                }
                return [{ tag: 'svg', attributes: i, children: e }];
              })(_)
        );
      }
      var st = function () {},
        ct =
          (C.measurePerformance && v && v.mark && v.measure,
          function (t, e, n, r) {
            var i,
              a,
              o,
              l = Object.keys(t),
              u = l.length,
              s =
                void 0 !== r
                  ? (function (t, e) {
                      return function (n, r, i, a) {
                        return t.call(e, n, r, i, a);
                      };
                    })(e, r)
                  : e;
            for (
              void 0 === n ? ((i = 1), (o = t[l[0]])) : ((i = 0), (o = n));
              i < u;
              i++
            )
              o = s(o, t[(a = l[i])], a, t);
            return o;
          });
      function ft(t, e) {
        var n = (arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : {}
          ).skipHooks,
          r = void 0 !== n && n,
          i = Object.keys(e).reduce(function (t, n) {
            var r = e[n];
            return !!r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t;
          }, {});
        'function' != typeof N.hooks.addPack || r
          ? (N.styles[t] = l({}, N.styles[t] || {}, i))
          : N.hooks.addPack(t, i),
          'fas' === t && ft('fa', e);
      }
      var ht = N.styles,
        pt = N.shims,
        dt = function () {
          var t = function (t) {
            return ct(
              ht,
              function (e, n, r) {
                return (e[r] = ct(n, t, {})), e;
              },
              {}
            );
          };
          t(function (t, e, n) {
            return e[3] && (t[e[3]] = n), t;
          }),
            t(function (t, e, n) {
              var r = e[2];
              return (
                (t[n] = n),
                r.forEach(function (e) {
                  t[e] = n;
                }),
                t
              );
            });
          var e = 'far' in ht;
          ct(
            pt,
            function (t, n) {
              var r = n[0],
                i = n[1],
                a = n[2];
              return (
                'far' !== i || e || (i = 'fas'),
                (t[r] = { prefix: i, iconName: a }),
                t
              );
            },
            {}
          );
        };
      dt();
      N.styles;
      function mt(t, e, n) {
        if (t && t[e] && t[e][n])
          return { prefix: e, iconName: n, icon: t[e][n] };
      }
      function yt(t) {
        var e = t.tag,
          n = t.attributes,
          r = void 0 === n ? {} : n,
          i = t.children,
          a = void 0 === i ? [] : i;
        return 'string' == typeof t
          ? nt(t)
          : '<'
              .concat(e, ' ')
              .concat(
                (function (t) {
                  return Object.keys(t || {})
                    .reduce(function (e, n) {
                      return e + ''.concat(n, '="').concat(nt(t[n]), '" ');
                    }, '')
                    .trim();
                })(r),
                '>'
              )
              .concat(a.map(yt).join(''), '</')
              .concat(e, '>');
      }
      var vt = function (t) {
        var e = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
        return t
          ? t
              .toLowerCase()
              .split(' ')
              .reduce(function (t, e) {
                var n = e.toLowerCase().split('-'),
                  r = n[0],
                  i = n.slice(1).join('-');
                if (r && 'h' === i) return (t.flipX = !0), t;
                if (r && 'v' === i) return (t.flipY = !0), t;
                if (((i = parseFloat(i)), isNaN(i))) return t;
                switch (r) {
                  case 'grow':
                    t.size = t.size + i;
                    break;
                  case 'shrink':
                    t.size = t.size - i;
                    break;
                  case 'left':
                    t.x = t.x - i;
                    break;
                  case 'right':
                    t.x = t.x + i;
                    break;
                  case 'up':
                    t.y = t.y - i;
                    break;
                  case 'down':
                    t.y = t.y + i;
                    break;
                  case 'rotate':
                    t.rotate = t.rotate + i;
                }
                return t;
              }, e)
          : e;
      };
      function gt(t) {
        (this.name = 'MissingIcon'),
          (this.message = t || 'Icon unavailable'),
          (this.stack = new Error().stack);
      }
      (gt.prototype = Object.create(Error.prototype)),
        (gt.prototype.constructor = gt);
      var _t = { fill: 'currentColor' },
        bt = { attributeType: 'XML', repeatCount: 'indefinite', dur: '2s' },
        wt = {
          tag: 'path',
          attributes: l({}, _t, {
            d:
              'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
          }),
        },
        xt = l({}, bt, { attributeName: 'opacity' });
      l({}, _t, { cx: '256', cy: '364', r: '28' }),
        l({}, bt, { attributeName: 'r', values: '28;14;28;28;14;28;' }),
        l({}, xt, { values: '1;0;1;1;0;1;' }),
        l({}, _t, {
          opacity: '1',
          d:
            'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
        }),
        l({}, xt, { values: '1;0;0;0;0;1;' }),
        l({}, _t, {
          opacity: '0',
          d:
            'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
        }),
        l({}, xt, { values: '0;0;1;1;0;0;' }),
        N.styles;
      function kt(t) {
        var e = t[0],
          n = t[1],
          r = u(t.slice(4), 1)[0];
        return {
          found: !0,
          width: e,
          height: n,
          icon: Array.isArray(r)
            ? {
                tag: 'g',
                attributes: {
                  class: ''.concat(C.familyPrefix, '-').concat(E.GROUP),
                },
                children: [
                  {
                    tag: 'path',
                    attributes: {
                      class: ''.concat(C.familyPrefix, '-').concat(E.SECONDARY),
                      fill: 'currentColor',
                      d: r[0],
                    },
                  },
                  {
                    tag: 'path',
                    attributes: {
                      class: ''.concat(C.familyPrefix, '-').concat(E.PRIMARY),
                      fill: 'currentColor',
                      d: r[1],
                    },
                  },
                ],
              }
            : { tag: 'path', attributes: { fill: 'currentColor', d: r } },
        };
      }
      N.styles;
      var Et =
        'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
      function Tt() {
        var t = _,
          e = b,
          n = C.familyPrefix,
          r = C.replacementClass,
          i = Et;
        if (n !== t || r !== e) {
          var a = new RegExp('\\.'.concat(t, '\\-'), 'g'),
            o = new RegExp('\\--'.concat(t, '\\-'), 'g'),
            l = new RegExp('\\.'.concat(e), 'g');
          i = i
            .replace(a, '.'.concat(n, '-'))
            .replace(o, '--'.concat(n, '-'))
            .replace(l, '.'.concat(r));
        }
        return i;
      }
      function St() {
        C.autoAddCss && !Ot && (J(Tt()), (Ot = !0));
      }
      function Ct(t, e) {
        return (
          Object.defineProperty(t, 'abstract', { get: e }),
          Object.defineProperty(t, 'html', {
            get: function () {
              return t.abstract.map(function (t) {
                return yt(t);
              });
            },
          }),
          Object.defineProperty(t, 'node', {
            get: function () {
              if (g) {
                var e = y.createElement('div');
                return (e.innerHTML = t.html), e.children;
              }
            },
          }),
          t
        );
      }
      function Mt(t) {
        var e = t.prefix,
          n = void 0 === e ? 'fa' : e,
          r = t.iconName;
        if (r) return mt(Pt.definitions, n, r) || mt(N.styles, n, r);
      }
      var Nt,
        Pt = new ((function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this.definitions = {});
          }
          var e, n, r;
          return (
            (e = t),
            (n = [
              {
                key: 'add',
                value: function () {
                  for (
                    var t = this, e = arguments.length, n = new Array(e), r = 0;
                    r < e;
                    r++
                  )
                    n[r] = arguments[r];
                  var i = n.reduce(this._pullDefinitions, {});
                  Object.keys(i).forEach(function (e) {
                    (t.definitions[e] = l({}, t.definitions[e] || {}, i[e])),
                      ft(e, i[e]),
                      dt();
                  });
                },
              },
              {
                key: 'reset',
                value: function () {
                  this.definitions = {};
                },
              },
              {
                key: '_pullDefinitions',
                value: function (t, e) {
                  var n = e.prefix && e.iconName && e.icon ? { 0: e } : e;
                  return (
                    Object.keys(n).map(function (e) {
                      var r = n[e],
                        i = r.prefix,
                        a = r.iconName,
                        o = r.icon;
                      t[i] || (t[i] = {}), (t[i][a] = o);
                    }),
                    t
                  );
                },
              },
            ]) && a(e.prototype, n),
            r && a(e, r),
            t
          );
        })())(),
        Ot = !1,
        At = {
          transform: function (t) {
            return vt(t);
          },
        },
        Lt =
          ((Nt = function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = e.transform,
              r = void 0 === n ? Z : n,
              i = e.symbol,
              a = void 0 !== i && i,
              o = e.mask,
              u = void 0 === o ? null : o,
              s = e.title,
              c = void 0 === s ? null : s,
              f = e.classes,
              h = void 0 === f ? [] : f,
              p = e.attributes,
              d = void 0 === p ? {} : p,
              m = e.styles,
              y = void 0 === m ? {} : m;
            if (t) {
              var v = t.prefix,
                g = t.iconName,
                _ = t.icon;
              return Ct(l({ type: 'icon' }, t), function () {
                return (
                  St(),
                  C.autoA11y &&
                    (c
                      ? (d['aria-labelledby'] = ''
                          .concat(C.replacementClass, '-title-')
                          .concat(et()))
                      : ((d['aria-hidden'] = 'true'), (d.focusable = 'false'))),
                  ut({
                    icons: {
                      main: kt(_),
                      mask: u
                        ? kt(u.icon)
                        : { found: !1, width: null, height: null, icon: {} },
                    },
                    prefix: v,
                    iconName: g,
                    transform: l({}, Z, r),
                    symbol: a,
                    title: c,
                    extra: { attributes: d, styles: y, classes: h },
                  })
                );
              });
            }
          }),
          function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = (t || {}).icon ? t : Mt(t || {}),
              r = e.mask;
            return (
              r && (r = (r || {}).icon ? r : Mt(r || {})),
              Nt(n, l({}, e, { mask: r }))
            );
          });
    }.call(this, n(10), n(66).setImmediate));
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    'use strict';
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      i = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    function o(t) {
      if (null == t)
        throw new TypeError(
          'Object.assign cannot be called with null or undefined'
        );
      return Object(t);
    }
    t.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var t = new String('abc');
        if (((t[5] = 'de'), '5' === Object.getOwnPropertyNames(t)[0]))
          return !1;
        for (var e = {}, n = 0; n < 10; n++)
          e['_' + String.fromCharCode(n)] = n;
        if (
          '0123456789' !==
          Object.getOwnPropertyNames(e)
            .map(function (t) {
              return e[t];
            })
            .join('')
        )
          return !1;
        var r = {};
        return (
          'abcdefghijklmnopqrst'.split('').forEach(function (t) {
            r[t] = t;
          }),
          'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, r)).join('')
        );
      } catch (t) {
        return !1;
      }
    })()
      ? Object.assign
      : function (t, e) {
          for (var n, l, u = o(t), s = 1; s < arguments.length; s++) {
            for (var c in (n = Object(arguments[s])))
              i.call(n, c) && (u[c] = n[c]);
            if (r) {
              l = r(n);
              for (var f = 0; f < l.length; f++)
                a.call(n, l[f]) && (u[l[f]] = n[l[f]]);
            }
          }
          return u;
        };
  },
  function (t, e, n) {
    'use strict';
    !(function t() {
      if (
        'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      ) {
        0;
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
        } catch (t) {
          console.error(t);
        }
      }
    })(),
      (t.exports = n(59));
  },
  function (t, e) {
    t.exports = function (t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      if (null == t) return {};
      var n,
        r,
        i = {},
        a = Object.keys(t);
      for (r = 0; r < a.length; r++)
        (n = a[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
      return i;
    };
  },
  function (t, e, n) {
    'use strict';
    var r = n(71),
      i = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      a = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      o = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      l = {};
    function u(t) {
      return r.isMemo(t) ? o : l[t.$$typeof] || i;
    }
    l[r.ForwardRef] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    };
    var s = Object.defineProperty,
      c = Object.getOwnPropertyNames,
      f = Object.getOwnPropertySymbols,
      h = Object.getOwnPropertyDescriptor,
      p = Object.getPrototypeOf,
      d = Object.prototype;
    t.exports = function t(e, n, r) {
      if ('string' != typeof n) {
        if (d) {
          var i = p(n);
          i && i !== d && t(e, i, r);
        }
        var o = c(n);
        f && (o = o.concat(f(n)));
        for (var l = u(e), m = u(n), y = 0; y < o.length; ++y) {
          var v = o[y];
          if (!(a[v] || (r && r[v]) || (m && m[v]) || (l && l[v]))) {
            var g = h(n, v);
            try {
              s(e, v, g);
            } catch (t) {}
          }
        }
        return e;
      }
      return e;
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    'use strict';
    /** @license React v16.10.0
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(39),
      i = 'function' == typeof Symbol && Symbol.for,
      a = i ? Symbol.for('react.element') : 60103,
      o = i ? Symbol.for('react.portal') : 60106,
      l = i ? Symbol.for('react.fragment') : 60107,
      u = i ? Symbol.for('react.strict_mode') : 60108,
      s = i ? Symbol.for('react.profiler') : 60114,
      c = i ? Symbol.for('react.provider') : 60109,
      f = i ? Symbol.for('react.context') : 60110,
      h = i ? Symbol.for('react.forward_ref') : 60112,
      p = i ? Symbol.for('react.suspense') : 60113,
      d = i ? Symbol.for('react.suspense_list') : 60120,
      m = i ? Symbol.for('react.memo') : 60115,
      y = i ? Symbol.for('react.lazy') : 60116;
    i && Symbol.for('react.fundamental'),
      i && Symbol.for('react.responder'),
      i && Symbol.for('react.scope');
    var v = 'function' == typeof Symbol && Symbol.iterator;
    function g(t) {
      for (
        var e = t.message,
          n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
          r = 1;
        r < arguments.length;
        r++
      )
        n += '&args[]=' + encodeURIComponent(arguments[r]);
      return (
        (t.message =
          'Minified React error #' +
          e +
          '; visit ' +
          n +
          ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings. '),
        t
      );
    }
    var _ = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      b = {};
    function w(t, e, n) {
      (this.props = t),
        (this.context = e),
        (this.refs = b),
        (this.updater = n || _);
    }
    function x() {}
    function k(t, e, n) {
      (this.props = t),
        (this.context = e),
        (this.refs = b),
        (this.updater = n || _);
    }
    (w.prototype.isReactComponent = {}),
      (w.prototype.setState = function (t, e) {
        if ('object' != typeof t && 'function' != typeof t && null != t)
          throw g(Error(85));
        this.updater.enqueueSetState(this, t, e, 'setState');
      }),
      (w.prototype.forceUpdate = function (t) {
        this.updater.enqueueForceUpdate(this, t, 'forceUpdate');
      }),
      (x.prototype = w.prototype);
    var E = (k.prototype = new x());
    (E.constructor = k), r(E, w.prototype), (E.isPureReactComponent = !0);
    var T = { current: null },
      S = { suspense: null },
      C = { current: null },
      M = Object.prototype.hasOwnProperty,
      N = { key: !0, ref: !0, __self: !0, __source: !0 };
    function P(t, e, n) {
      var r,
        i = {},
        o = null,
        l = null;
      if (null != e)
        for (r in (void 0 !== e.ref && (l = e.ref),
        void 0 !== e.key && (o = '' + e.key),
        e))
          M.call(e, r) && !N.hasOwnProperty(r) && (i[r] = e[r]);
      var u = arguments.length - 2;
      if (1 === u) i.children = n;
      else if (1 < u) {
        for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
        i.children = s;
      }
      if (t && t.defaultProps)
        for (r in (u = t.defaultProps)) void 0 === i[r] && (i[r] = u[r]);
      return {
        $$typeof: a,
        type: t,
        key: o,
        ref: l,
        props: i,
        _owner: C.current,
      };
    }
    function O(t) {
      return 'object' == typeof t && null !== t && t.$$typeof === a;
    }
    var A = /\/+/g,
      L = [];
    function R(t, e, n, r) {
      if (L.length) {
        var i = L.pop();
        return (
          (i.result = t),
          (i.keyPrefix = e),
          (i.func = n),
          (i.context = r),
          (i.count = 0),
          i
        );
      }
      return { result: t, keyPrefix: e, func: n, context: r, count: 0 };
    }
    function F(t) {
      (t.result = null),
        (t.keyPrefix = null),
        (t.func = null),
        (t.context = null),
        (t.count = 0),
        10 > L.length && L.push(t);
    }
    function z(t, e, n) {
      return null == t
        ? 0
        : (function t(e, n, r, i) {
            var l = typeof e;
            ('undefined' !== l && 'boolean' !== l) || (e = null);
            var u = !1;
            if (null === e) u = !0;
            else
              switch (l) {
                case 'string':
                case 'number':
                  u = !0;
                  break;
                case 'object':
                  switch (e.$$typeof) {
                    case a:
                    case o:
                      u = !0;
                  }
              }
            if (u) return r(i, e, '' === n ? '.' + I(e, 0) : n), 1;
            if (((u = 0), (n = '' === n ? '.' : n + ':'), Array.isArray(e)))
              for (var s = 0; s < e.length; s++) {
                var c = n + I((l = e[s]), s);
                u += t(l, c, r, i);
              }
            else if (
              (null === e || 'object' != typeof e
                ? (c = null)
                : (c =
                    'function' == typeof (c = (v && e[v]) || e['@@iterator'])
                      ? c
                      : null),
              'function' == typeof c)
            )
              for (e = c.call(e), s = 0; !(l = e.next()).done; )
                u += t((l = l.value), (c = n + I(l, s++)), r, i);
            else if ('object' === l)
              throw (
                ((r = '' + e),
                g(
                  Error(31),
                  '[object Object]' === r
                    ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                    : r,
                  ''
                ))
              );
            return u;
          })(t, '', e, n);
    }
    function I(t, e) {
      return 'object' == typeof t && null !== t && null != t.key
        ? (function (t) {
            var e = { '=': '=0', ':': '=2' };
            return (
              '$' +
              ('' + t).replace(/[=:]/g, function (t) {
                return e[t];
              })
            );
          })(t.key)
        : e.toString(36);
    }
    function j(t, e) {
      t.func.call(t.context, e, t.count++);
    }
    function U(t, e, n) {
      var r = t.result,
        i = t.keyPrefix;
      (t = t.func.call(t.context, e, t.count++)),
        Array.isArray(t)
          ? D(t, r, n, function (t) {
              return t;
            })
          : null != t &&
            (O(t) &&
              (t = (function (t, e) {
                return {
                  $$typeof: a,
                  type: t.type,
                  key: e,
                  ref: t.ref,
                  props: t.props,
                  _owner: t._owner,
                };
              })(
                t,
                i +
                  (!t.key || (e && e.key === t.key)
                    ? ''
                    : ('' + t.key).replace(A, '$&/') + '/') +
                  n
              )),
            r.push(t));
    }
    function D(t, e, n, r, i) {
      var a = '';
      null != n && (a = ('' + n).replace(A, '$&/') + '/'),
        z(t, U, (e = R(e, a, r, i))),
        F(e);
    }
    function H() {
      var t = T.current;
      if (null === t) throw g(Error(321));
      return t;
    }
    var W = {
        Children: {
          map: function (t, e, n) {
            if (null == t) return t;
            var r = [];
            return D(t, r, null, e, n), r;
          },
          forEach: function (t, e, n) {
            if (null == t) return t;
            z(t, j, (e = R(null, null, e, n))), F(e);
          },
          count: function (t) {
            return z(
              t,
              function () {
                return null;
              },
              null
            );
          },
          toArray: function (t) {
            var e = [];
            return (
              D(t, e, null, function (t) {
                return t;
              }),
              e
            );
          },
          only: function (t) {
            if (!O(t)) throw g(Error(143));
            return t;
          },
        },
        createRef: function () {
          return { current: null };
        },
        Component: w,
        PureComponent: k,
        createContext: function (t, e) {
          return (
            void 0 === e && (e = null),
            ((t = {
              $$typeof: f,
              _calculateChangedBits: e,
              _currentValue: t,
              _currentValue2: t,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: c, _context: t }),
            (t.Consumer = t)
          );
        },
        forwardRef: function (t) {
          return { $$typeof: h, render: t };
        },
        lazy: function (t) {
          return { $$typeof: y, _ctor: t, _status: -1, _result: null };
        },
        memo: function (t, e) {
          return { $$typeof: m, type: t, compare: void 0 === e ? null : e };
        },
        useCallback: function (t, e) {
          return H().useCallback(t, e);
        },
        useContext: function (t, e) {
          return H().useContext(t, e);
        },
        useEffect: function (t, e) {
          return H().useEffect(t, e);
        },
        useImperativeHandle: function (t, e, n) {
          return H().useImperativeHandle(t, e, n);
        },
        useDebugValue: function () {},
        useLayoutEffect: function (t, e) {
          return H().useLayoutEffect(t, e);
        },
        useMemo: function (t, e) {
          return H().useMemo(t, e);
        },
        useReducer: function (t, e, n) {
          return H().useReducer(t, e, n);
        },
        useRef: function (t) {
          return H().useRef(t);
        },
        useState: function (t) {
          return H().useState(t);
        },
        Fragment: l,
        Profiler: s,
        StrictMode: u,
        Suspense: p,
        unstable_SuspenseList: d,
        createElement: P,
        cloneElement: function (t, e, n) {
          if (null == t) throw g(Error(267), t);
          var i = r({}, t.props),
            o = t.key,
            l = t.ref,
            u = t._owner;
          if (null != e) {
            if (
              (void 0 !== e.ref && ((l = e.ref), (u = C.current)),
              void 0 !== e.key && (o = '' + e.key),
              t.type && t.type.defaultProps)
            )
              var s = t.type.defaultProps;
            for (c in e)
              M.call(e, c) &&
                !N.hasOwnProperty(c) &&
                (i[c] = void 0 === e[c] && void 0 !== s ? s[c] : e[c]);
          }
          var c = arguments.length - 2;
          if (1 === c) i.children = n;
          else if (1 < c) {
            s = Array(c);
            for (var f = 0; f < c; f++) s[f] = arguments[f + 2];
            i.children = s;
          }
          return {
            $$typeof: a,
            type: t.type,
            key: o,
            ref: l,
            props: i,
            _owner: u,
          };
        },
        createFactory: function (t) {
          var e = P.bind(null, t);
          return (e.type = t), e;
        },
        isValidElement: O,
        version: '16.10.0',
        unstable_withSuspenseConfig: function (t, e) {
          var n = S.suspense;
          S.suspense = void 0 === e ? null : e;
          try {
            t();
          } finally {
            S.suspense = n;
          }
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentDispatcher: T,
          ReactCurrentBatchConfig: S,
          ReactCurrentOwner: C,
          IsSomeRendererActing: { current: !1 },
          assign: r,
        },
      },
      $ = { default: W },
      Y = ($ && W) || $;
    t.exports = Y.default || Y;
  },
  function (t, e, n) {
    'use strict';
    /** @license React v16.10.0
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(0),
      i = n(39),
      a = n(60);
    function o(t) {
      for (
        var e = t.message,
          n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
          r = 1;
        r < arguments.length;
        r++
      )
        n += '&args[]=' + encodeURIComponent(arguments[r]);
      return (
        (t.message =
          'Minified React error #' +
          e +
          '; visit ' +
          n +
          ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings. '),
        t
      );
    }
    if (!r) throw o(Error(227));
    var l = null,
      u = {};
    function s() {
      if (l)
        for (var t in u) {
          var e = u[t],
            n = l.indexOf(t);
          if (!(-1 < n)) throw o(Error(96), t);
          if (!f[n]) {
            if (!e.extractEvents) throw o(Error(97), t);
            for (var r in ((f[n] = e), (n = e.eventTypes))) {
              var i = void 0,
                a = n[r],
                s = e,
                p = r;
              if (h.hasOwnProperty(p)) throw o(Error(99), p);
              h[p] = a;
              var d = a.phasedRegistrationNames;
              if (d) {
                for (i in d) d.hasOwnProperty(i) && c(d[i], s, p);
                i = !0;
              } else
                a.registrationName
                  ? (c(a.registrationName, s, p), (i = !0))
                  : (i = !1);
              if (!i) throw o(Error(98), r, t);
            }
          }
        }
    }
    function c(t, e, n) {
      if (p[t]) throw o(Error(100), t);
      (p[t] = e), (d[t] = e.eventTypes[n].dependencies);
    }
    var f = [],
      h = {},
      p = {},
      d = {};
    function m(t, e, n, r, i, a, o, l, u) {
      var s = Array.prototype.slice.call(arguments, 3);
      try {
        e.apply(n, s);
      } catch (t) {
        this.onError(t);
      }
    }
    var y = !1,
      v = null,
      g = !1,
      _ = null,
      b = {
        onError: function (t) {
          (y = !0), (v = t);
        },
      };
    function w(t, e, n, r, i, a, o, l, u) {
      (y = !1), (v = null), m.apply(b, arguments);
    }
    var x = null,
      k = null,
      E = null;
    function T(t, e, n) {
      var r = t.type || 'unknown-event';
      (t.currentTarget = E(n)),
        (function (t, e, n, r, i, a, l, u, s) {
          if ((w.apply(this, arguments), y)) {
            if (!y) throw o(Error(198));
            var c = v;
            (y = !1), (v = null), g || ((g = !0), (_ = c));
          }
        })(r, e, void 0, t),
        (t.currentTarget = null);
    }
    function S(t, e) {
      if (null == e) throw o(Error(30));
      return null == t
        ? e
        : Array.isArray(t)
        ? Array.isArray(e)
          ? (t.push.apply(t, e), t)
          : (t.push(e), t)
        : Array.isArray(e)
        ? [t].concat(e)
        : [t, e];
    }
    function C(t, e, n) {
      Array.isArray(t) ? t.forEach(e, n) : t && e.call(n, t);
    }
    var M = null;
    function N(t) {
      if (t) {
        var e = t._dispatchListeners,
          n = t._dispatchInstances;
        if (Array.isArray(e))
          for (var r = 0; r < e.length && !t.isPropagationStopped(); r++)
            T(t, e[r], n[r]);
        else e && T(t, e, n);
        (t._dispatchListeners = null),
          (t._dispatchInstances = null),
          t.isPersistent() || t.constructor.release(t);
      }
    }
    function P(t) {
      if ((null !== t && (M = S(M, t)), (t = M), (M = null), t)) {
        if ((C(t, N), M)) throw o(Error(95));
        if (g) throw ((t = _), (g = !1), (_ = null), t);
      }
    }
    var O = {
      injectEventPluginOrder: function (t) {
        if (l) throw o(Error(101));
        (l = Array.prototype.slice.call(t)), s();
      },
      injectEventPluginsByName: function (t) {
        var e,
          n = !1;
        for (e in t)
          if (t.hasOwnProperty(e)) {
            var r = t[e];
            if (!u.hasOwnProperty(e) || u[e] !== r) {
              if (u[e]) throw o(Error(102), e);
              (u[e] = r), (n = !0);
            }
          }
        n && s();
      },
    };
    function A(t, e) {
      var n = t.stateNode;
      if (!n) return null;
      var r = x(n);
      if (!r) return null;
      n = r[e];
      t: switch (e) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
          (r = !r.disabled) ||
            (r = !(
              'button' === (t = t.type) ||
              'input' === t ||
              'select' === t ||
              'textarea' === t
            )),
            (t = !r);
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (n && 'function' != typeof n) throw o(Error(231), e, typeof n);
      return n;
    }
    var L = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    L.hasOwnProperty('ReactCurrentDispatcher') ||
      (L.ReactCurrentDispatcher = { current: null }),
      L.hasOwnProperty('ReactCurrentBatchConfig') ||
        (L.ReactCurrentBatchConfig = { suspense: null });
    var R = /^(.*)[\\\/]/,
      F = 'function' == typeof Symbol && Symbol.for,
      z = F ? Symbol.for('react.element') : 60103,
      I = F ? Symbol.for('react.portal') : 60106,
      j = F ? Symbol.for('react.fragment') : 60107,
      U = F ? Symbol.for('react.strict_mode') : 60108,
      D = F ? Symbol.for('react.profiler') : 60114,
      H = F ? Symbol.for('react.provider') : 60109,
      W = F ? Symbol.for('react.context') : 60110,
      $ = F ? Symbol.for('react.concurrent_mode') : 60111,
      Y = F ? Symbol.for('react.forward_ref') : 60112,
      B = F ? Symbol.for('react.suspense') : 60113,
      q = F ? Symbol.for('react.suspense_list') : 60120,
      V = F ? Symbol.for('react.memo') : 60115,
      X = F ? Symbol.for('react.lazy') : 60116;
    F && Symbol.for('react.fundamental'),
      F && Symbol.for('react.responder'),
      F && Symbol.for('react.scope');
    var Q = 'function' == typeof Symbol && Symbol.iterator;
    function K(t) {
      return null === t || 'object' != typeof t
        ? null
        : 'function' == typeof (t = (Q && t[Q]) || t['@@iterator'])
        ? t
        : null;
    }
    function G(t) {
      if (null == t) return null;
      if ('function' == typeof t) return t.displayName || t.name || null;
      if ('string' == typeof t) return t;
      switch (t) {
        case j:
          return 'Fragment';
        case I:
          return 'Portal';
        case D:
          return 'Profiler';
        case U:
          return 'StrictMode';
        case B:
          return 'Suspense';
        case q:
          return 'SuspenseList';
      }
      if ('object' == typeof t)
        switch (t.$$typeof) {
          case W:
            return 'Context.Consumer';
          case H:
            return 'Context.Provider';
          case Y:
            var e = t.render;
            return (
              (e = e.displayName || e.name || ''),
              t.displayName ||
                ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
            );
          case V:
            return G(t.type);
          case X:
            if ((t = 1 === t._status ? t._result : null)) return G(t);
        }
      return null;
    }
    function Z(t) {
      var e = '';
      do {
        t: switch (t.tag) {
          case 3:
          case 4:
          case 6:
          case 7:
          case 10:
          case 9:
            var n = '';
            break t;
          default:
            var r = t._debugOwner,
              i = t._debugSource,
              a = G(t.type);
            (n = null),
              r && (n = G(r.type)),
              (r = a),
              (a = ''),
              i
                ? (a =
                    ' (at ' +
                    i.fileName.replace(R, '') +
                    ':' +
                    i.lineNumber +
                    ')')
                : n && (a = ' (created by ' + n + ')'),
              (n = '\n    in ' + (r || 'Unknown') + a);
        }
        (e += n), (t = t.return);
      } while (t);
      return e;
    }
    var J = !(
        'undefined' == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      ),
      tt = null,
      et = null,
      nt = null;
    function rt(t) {
      if ((t = k(t))) {
        if ('function' != typeof tt) throw o(Error(280));
        var e = x(t.stateNode);
        tt(t.stateNode, t.type, e);
      }
    }
    function it(t) {
      et ? (nt ? nt.push(t) : (nt = [t])) : (et = t);
    }
    function at() {
      if (et) {
        var t = et,
          e = nt;
        if (((nt = et = null), rt(t), e))
          for (t = 0; t < e.length; t++) rt(e[t]);
      }
    }
    function ot(t, e) {
      return t(e);
    }
    function lt(t, e, n, r) {
      return t(e, n, r);
    }
    function ut() {}
    var st = ot,
      ct = !1,
      ft = !1;
    function ht() {
      (null === et && null === nt) || (ut(), at());
    }
    new Map(), new Map(), new Map();
    var pt = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      dt = Object.prototype.hasOwnProperty,
      mt = {},
      yt = {};
    function vt(t, e, n, r, i, a) {
      (this.acceptsBooleans = 2 === e || 3 === e || 4 === e),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = t),
        (this.type = e),
        (this.sanitizeURL = a);
    }
    var gt = {};
    'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
      .split(' ')
      .forEach(function (t) {
        gt[t] = new vt(t, 0, !1, t, null, !1);
      }),
      [
        ['acceptCharset', 'accept-charset'],
        ['className', 'class'],
        ['htmlFor', 'for'],
        ['httpEquiv', 'http-equiv'],
      ].forEach(function (t) {
        var e = t[0];
        gt[e] = new vt(e, 1, !1, t[1], null, !1);
      }),
      ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (
        t
      ) {
        gt[t] = new vt(t, 2, !1, t.toLowerCase(), null, !1);
      }),
      [
        'autoReverse',
        'externalResourcesRequired',
        'focusable',
        'preserveAlpha',
      ].forEach(function (t) {
        gt[t] = new vt(t, 2, !1, t, null, !1);
      }),
      'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
        .split(' ')
        .forEach(function (t) {
          gt[t] = new vt(t, 3, !1, t.toLowerCase(), null, !1);
        }),
      ['checked', 'multiple', 'muted', 'selected'].forEach(function (t) {
        gt[t] = new vt(t, 3, !0, t, null, !1);
      }),
      ['capture', 'download'].forEach(function (t) {
        gt[t] = new vt(t, 4, !1, t, null, !1);
      }),
      ['cols', 'rows', 'size', 'span'].forEach(function (t) {
        gt[t] = new vt(t, 6, !1, t, null, !1);
      }),
      ['rowSpan', 'start'].forEach(function (t) {
        gt[t] = new vt(t, 5, !1, t.toLowerCase(), null, !1);
      });
    var _t = /[\-:]([a-z])/g;
    function bt(t) {
      return t[1].toUpperCase();
    }
    function wt(t) {
      switch (typeof t) {
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        case 'undefined':
          return t;
        default:
          return '';
      }
    }
    function xt(t, e, n, r) {
      var i = gt.hasOwnProperty(e) ? gt[e] : null;
      (null !== i
        ? 0 === i.type
        : !r &&
          2 < e.length &&
          ('o' === e[0] || 'O' === e[0]) &&
          ('n' === e[1] || 'N' === e[1])) ||
        ((function (t, e, n, r) {
          if (
            null == e ||
            (function (t, e, n, r) {
              if (null !== n && 0 === n.type) return !1;
              switch (typeof e) {
                case 'function':
                case 'symbol':
                  return !0;
                case 'boolean':
                  return (
                    !r &&
                    (null !== n
                      ? !n.acceptsBooleans
                      : 'data-' !== (t = t.toLowerCase().slice(0, 5)) &&
                        'aria-' !== t)
                  );
                default:
                  return !1;
              }
            })(t, e, n, r)
          )
            return !0;
          if (r) return !1;
          if (null !== n)
            switch (n.type) {
              case 3:
                return !e;
              case 4:
                return !1 === e;
              case 5:
                return isNaN(e);
              case 6:
                return isNaN(e) || 1 > e;
            }
          return !1;
        })(e, n, i, r) && (n = null),
        r || null === i
          ? (function (t) {
              return (
                !!dt.call(yt, t) ||
                (!dt.call(mt, t) &&
                  (pt.test(t) ? (yt[t] = !0) : ((mt[t] = !0), !1)))
              );
            })(e) &&
            (null === n ? t.removeAttribute(e) : t.setAttribute(e, '' + n))
          : i.mustUseProperty
          ? (t[i.propertyName] = null === n ? 3 !== i.type && '' : n)
          : ((e = i.attributeName),
            (r = i.attributeNamespace),
            null === n
              ? t.removeAttribute(e)
              : ((n =
                  3 === (i = i.type) || (4 === i && !0 === n) ? '' : '' + n),
                r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))));
    }
    function kt(t) {
      var e = t.type;
      return (
        (t = t.nodeName) &&
        'input' === t.toLowerCase() &&
        ('checkbox' === e || 'radio' === e)
      );
    }
    function Et(t) {
      t._valueTracker ||
        (t._valueTracker = (function (t) {
          var e = kt(t) ? 'checked' : 'value',
            n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
            r = '' + t[e];
          if (
            !t.hasOwnProperty(e) &&
            void 0 !== n &&
            'function' == typeof n.get &&
            'function' == typeof n.set
          ) {
            var i = n.get,
              a = n.set;
            return (
              Object.defineProperty(t, e, {
                configurable: !0,
                get: function () {
                  return i.call(this);
                },
                set: function (t) {
                  (r = '' + t), a.call(this, t);
                },
              }),
              Object.defineProperty(t, e, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (t) {
                  r = '' + t;
                },
                stopTracking: function () {
                  (t._valueTracker = null), delete t[e];
                },
              }
            );
          }
        })(t));
    }
    function Tt(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var n = e.getValue(),
        r = '';
      return (
        t && (r = kt(t) ? (t.checked ? 'true' : 'false') : t.value),
        (t = r) !== n && (e.setValue(t), !0)
      );
    }
    function St(t, e) {
      var n = e.checked;
      return i({}, e, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : t._wrapperState.initialChecked,
      });
    }
    function Ct(t, e) {
      var n = null == e.defaultValue ? '' : e.defaultValue,
        r = null != e.checked ? e.checked : e.defaultChecked;
      (n = wt(null != e.value ? e.value : n)),
        (t._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            'checkbox' === e.type || 'radio' === e.type
              ? null != e.checked
              : null != e.value,
        });
    }
    function Mt(t, e) {
      null != (e = e.checked) && xt(t, 'checked', e, !1);
    }
    function Nt(t, e) {
      Mt(t, e);
      var n = wt(e.value),
        r = e.type;
      if (null != n)
        'number' === r
          ? ((0 === n && '' === t.value) || t.value != n) && (t.value = '' + n)
          : t.value !== '' + n && (t.value = '' + n);
      else if ('submit' === r || 'reset' === r)
        return void t.removeAttribute('value');
      e.hasOwnProperty('value')
        ? Ot(t, e.type, n)
        : e.hasOwnProperty('defaultValue') && Ot(t, e.type, wt(e.defaultValue)),
        null == e.checked &&
          null != e.defaultChecked &&
          (t.defaultChecked = !!e.defaultChecked);
    }
    function Pt(t, e, n) {
      if (e.hasOwnProperty('value') || e.hasOwnProperty('defaultValue')) {
        var r = e.type;
        if (
          !(
            ('submit' !== r && 'reset' !== r) ||
            (void 0 !== e.value && null !== e.value)
          )
        )
          return;
        (e = '' + t._wrapperState.initialValue),
          n || e === t.value || (t.value = e),
          (t.defaultValue = e);
      }
      '' !== (n = t.name) && (t.name = ''),
        (t.defaultChecked = !t.defaultChecked),
        (t.defaultChecked = !!t._wrapperState.initialChecked),
        '' !== n && (t.name = n);
    }
    function Ot(t, e, n) {
      ('number' === e && t.ownerDocument.activeElement === t) ||
        (null == n
          ? (t.defaultValue = '' + t._wrapperState.initialValue)
          : t.defaultValue !== '' + n && (t.defaultValue = '' + n));
    }
    function At(t, e) {
      return (
        (t = i({ children: void 0 }, e)),
        (e = (function (t) {
          var e = '';
          return (
            r.Children.forEach(t, function (t) {
              null != t && (e += t);
            }),
            e
          );
        })(e.children)) && (t.children = e),
        t
      );
    }
    function Lt(t, e, n, r) {
      if (((t = t.options), e)) {
        e = {};
        for (var i = 0; i < n.length; i++) e['$' + n[i]] = !0;
        for (n = 0; n < t.length; n++)
          (i = e.hasOwnProperty('$' + t[n].value)),
            t[n].selected !== i && (t[n].selected = i),
            i && r && (t[n].defaultSelected = !0);
      } else {
        for (n = '' + wt(n), e = null, i = 0; i < t.length; i++) {
          if (t[i].value === n)
            return (
              (t[i].selected = !0), void (r && (t[i].defaultSelected = !0))
            );
          null !== e || t[i].disabled || (e = t[i]);
        }
        null !== e && (e.selected = !0);
      }
    }
    function Rt(t, e) {
      if (null != e.dangerouslySetInnerHTML) throw o(Error(91));
      return i({}, e, {
        value: void 0,
        defaultValue: void 0,
        children: '' + t._wrapperState.initialValue,
      });
    }
    function Ft(t, e) {
      var n = e.value;
      if (null == n) {
        if (((n = e.defaultValue), null != (e = e.children))) {
          if (null != n) throw o(Error(92));
          if (Array.isArray(e)) {
            if (!(1 >= e.length)) throw o(Error(93));
            e = e[0];
          }
          n = e;
        }
        null == n && (n = '');
      }
      t._wrapperState = { initialValue: wt(n) };
    }
    function zt(t, e) {
      var n = wt(e.value),
        r = wt(e.defaultValue);
      null != n &&
        ((n = '' + n) !== t.value && (t.value = n),
        null == e.defaultValue && t.defaultValue !== n && (t.defaultValue = n)),
        null != r && (t.defaultValue = '' + r);
    }
    function It(t) {
      var e = t.textContent;
      e === t._wrapperState.initialValue &&
        '' !== e &&
        null !== e &&
        (t.value = e);
    }
    'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
      .split(' ')
      .forEach(function (t) {
        var e = t.replace(_t, bt);
        gt[e] = new vt(e, 1, !1, t, null, !1);
      }),
      'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
        .split(' ')
        .forEach(function (t) {
          var e = t.replace(_t, bt);
          gt[e] = new vt(e, 1, !1, t, 'http://www.w3.org/1999/xlink', !1);
        }),
      ['xml:base', 'xml:lang', 'xml:space'].forEach(function (t) {
        var e = t.replace(_t, bt);
        gt[e] = new vt(e, 1, !1, t, 'http://www.w3.org/XML/1998/namespace', !1);
      }),
      ['tabIndex', 'crossOrigin'].forEach(function (t) {
        gt[t] = new vt(t, 1, !1, t.toLowerCase(), null, !1);
      }),
      (gt.xlinkHref = new vt(
        'xlinkHref',
        1,
        !1,
        'xlink:href',
        'http://www.w3.org/1999/xlink',
        !0
      )),
      ['src', 'href', 'action', 'formAction'].forEach(function (t) {
        gt[t] = new vt(t, 1, !1, t.toLowerCase(), null, !0);
      });
    var jt = {
      html: 'http://www.w3.org/1999/xhtml',
      mathml: 'http://www.w3.org/1998/Math/MathML',
      svg: 'http://www.w3.org/2000/svg',
    };
    function Ut(t) {
      switch (t) {
        case 'svg':
          return 'http://www.w3.org/2000/svg';
        case 'math':
          return 'http://www.w3.org/1998/Math/MathML';
        default:
          return 'http://www.w3.org/1999/xhtml';
      }
    }
    function Dt(t, e) {
      return null == t || 'http://www.w3.org/1999/xhtml' === t
        ? Ut(e)
        : 'http://www.w3.org/2000/svg' === t && 'foreignObject' === e
        ? 'http://www.w3.org/1999/xhtml'
        : t;
    }
    var Ht,
      Wt = (function (t) {
        return 'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (e, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return t(e, n);
              });
            }
          : t;
      })(function (t, e) {
        if (t.namespaceURI !== jt.svg || 'innerHTML' in t) t.innerHTML = e;
        else {
          for (
            (Ht = Ht || document.createElement('div')).innerHTML =
              '<svg>' + e.valueOf().toString() + '</svg>',
              e = Ht.firstChild;
            t.firstChild;

          )
            t.removeChild(t.firstChild);
          for (; e.firstChild; ) t.appendChild(e.firstChild);
        }
      });
    function $t(t, e) {
      if (e) {
        var n = t.firstChild;
        if (n && n === t.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = e);
      }
      t.textContent = e;
    }
    function Yt(t, e) {
      var n = {};
      return (
        (n[t.toLowerCase()] = e.toLowerCase()),
        (n['Webkit' + t] = 'webkit' + e),
        (n['Moz' + t] = 'moz' + e),
        n
      );
    }
    var Bt = {
        animationend: Yt('Animation', 'AnimationEnd'),
        animationiteration: Yt('Animation', 'AnimationIteration'),
        animationstart: Yt('Animation', 'AnimationStart'),
        transitionend: Yt('Transition', 'TransitionEnd'),
      },
      qt = {},
      Vt = {};
    function Xt(t) {
      if (qt[t]) return qt[t];
      if (!Bt[t]) return t;
      var e,
        n = Bt[t];
      for (e in n) if (n.hasOwnProperty(e) && e in Vt) return (qt[t] = n[e]);
      return t;
    }
    J &&
      ((Vt = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete Bt.animationend.animation,
        delete Bt.animationiteration.animation,
        delete Bt.animationstart.animation),
      'TransitionEvent' in window || delete Bt.transitionend.transition);
    var Qt = Xt('animationend'),
      Kt = Xt('animationiteration'),
      Gt = Xt('animationstart'),
      Zt = Xt('transitionend'),
      Jt = 'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
      te = !1,
      ee = [],
      ne = null,
      re = null,
      ie = null,
      ae = new Map(),
      oe = new Map(),
      le = 'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit'.split(
        ' '
      ),
      ue = 'focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture'.split(
        ' '
      );
    function se(t, e, n, r) {
      return {
        blockedOn: t,
        topLevelType: e,
        eventSystemFlags: 32 | n,
        nativeEvent: r,
      };
    }
    function ce(t, e) {
      switch (t) {
        case 'focus':
        case 'blur':
          ne = null;
          break;
        case 'dragenter':
        case 'dragleave':
          re = null;
          break;
        case 'mouseover':
        case 'mouseout':
          ie = null;
          break;
        case 'pointerover':
        case 'pointerout':
          ae.delete(e.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          oe.delete(e.pointerId);
      }
    }
    function fe(t, e, n, r, i) {
      return null === t || t.nativeEvent !== i
        ? se(e, n, r, i)
        : ((t.eventSystemFlags |= r), t);
    }
    function he(t) {
      if (null !== t.blockedOn) return !1;
      var e = Sn(t.topLevelType, t.eventSystemFlags, t.nativeEvent);
      return null === e || ((t.blockedOn = e), !1);
    }
    function pe(t, e, n) {
      he(t) && n.delete(e);
    }
    function de() {
      for (te = !1; 0 < ee.length; ) {
        var t = ee[0];
        if (null !== t.blockedOn) break;
        var e = Sn(t.topLevelType, t.eventSystemFlags, t.nativeEvent);
        null !== e ? (t.blockedOn = e) : ee.shift();
      }
      null !== ne && he(ne) && (ne = null),
        null !== re && he(re) && (re = null),
        null !== ie && he(ie) && (ie = null),
        ae.forEach(pe),
        oe.forEach(pe);
    }
    function me(t, e) {
      t.blockedOn === e &&
        ((t.blockedOn = null),
        te ||
          ((te = !0),
          a.unstable_scheduleCallback(a.unstable_NormalPriority, de)));
    }
    function ye(t) {
      function e(e) {
        return me(e, t);
      }
      if (0 < ee.length) {
        me(ee[0], t);
        for (var n = 1; n < ee.length; n++) {
          var r = ee[n];
          r.blockedOn === t && (r.blockedOn = null);
        }
      }
      null !== ne && me(ne, t),
        null !== re && me(re, t),
        null !== ie && me(ie, t),
        ae.forEach(e),
        oe.forEach(e);
    }
    var ve = 0,
      ge = 2,
      _e = 1024;
    function be(t) {
      var e = t,
        n = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do {
          ((e = t).effectTag & (ge | _e)) !== ve && (n = e.return),
            (t = e.return);
        } while (t);
      }
      return 3 === e.tag ? n : null;
    }
    function we(t) {
      if (be(t) !== t) throw o(Error(188));
    }
    function xe(t) {
      if (
        !(t = (function (t) {
          var e = t.alternate;
          if (!e) {
            if (null === (e = be(t))) throw o(Error(188));
            return e !== t ? null : t;
          }
          for (var n = t, r = e; ; ) {
            var i = n.return;
            if (null === i) break;
            var a = i.alternate;
            if (null === a) {
              if (null !== (r = i.return)) {
                n = r;
                continue;
              }
              break;
            }
            if (i.child === a.child) {
              for (a = i.child; a; ) {
                if (a === n) return we(i), t;
                if (a === r) return we(i), e;
                a = a.sibling;
              }
              throw o(Error(188));
            }
            if (n.return !== r.return) (n = i), (r = a);
            else {
              for (var l = !1, u = i.child; u; ) {
                if (u === n) {
                  (l = !0), (n = i), (r = a);
                  break;
                }
                if (u === r) {
                  (l = !0), (r = i), (n = a);
                  break;
                }
                u = u.sibling;
              }
              if (!l) {
                for (u = a.child; u; ) {
                  if (u === n) {
                    (l = !0), (n = a), (r = i);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = a), (n = i);
                    break;
                  }
                  u = u.sibling;
                }
                if (!l) throw o(Error(189));
              }
            }
            if (n.alternate !== r) throw o(Error(190));
          }
          if (3 !== n.tag) throw o(Error(188));
          return n.stateNode.current === n ? t : e;
        })(t))
      )
        return null;
      for (var e = t; ; ) {
        if (5 === e.tag || 6 === e.tag) return e;
        if (e.child) (e.child.return = e), (e = e.child);
        else {
          if (e === t) break;
          for (; !e.sibling; ) {
            if (!e.return || e.return === t) return null;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      }
      return null;
    }
    function ke(t) {
      return (
        (t = t.target || t.srcElement || window).correspondingUseElement &&
          (t = t.correspondingUseElement),
        3 === t.nodeType ? t.parentNode : t
      );
    }
    function Ee(t) {
      do {
        t = t.return;
      } while (t && 5 !== t.tag);
      return t || null;
    }
    function Te(t, e, n) {
      (e = A(t, n.dispatchConfig.phasedRegistrationNames[e])) &&
        ((n._dispatchListeners = S(n._dispatchListeners, e)),
        (n._dispatchInstances = S(n._dispatchInstances, t)));
    }
    function Se(t) {
      if (t && t.dispatchConfig.phasedRegistrationNames) {
        for (var e = t._targetInst, n = []; e; ) n.push(e), (e = Ee(e));
        for (e = n.length; 0 < e--; ) Te(n[e], 'captured', t);
        for (e = 0; e < n.length; e++) Te(n[e], 'bubbled', t);
      }
    }
    function Ce(t, e, n) {
      t &&
        n &&
        n.dispatchConfig.registrationName &&
        (e = A(t, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = S(n._dispatchListeners, e)),
        (n._dispatchInstances = S(n._dispatchInstances, t)));
    }
    function Me(t) {
      t && t.dispatchConfig.registrationName && Ce(t._targetInst, null, t);
    }
    function Ne(t) {
      C(t, Se);
    }
    function Pe() {
      return !0;
    }
    function Oe() {
      return !1;
    }
    function Ae(t, e, n, r) {
      for (var i in ((this.dispatchConfig = t),
      (this._targetInst = e),
      (this.nativeEvent = n),
      (t = this.constructor.Interface)))
        t.hasOwnProperty(i) &&
          ((e = t[i])
            ? (this[i] = e(n))
            : 'target' === i
            ? (this.target = r)
            : (this[i] = n[i]));
      return (
        (this.isDefaultPrevented = (
          null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
        )
          ? Pe
          : Oe),
        (this.isPropagationStopped = Oe),
        this
      );
    }
    function Le(t, e, n, r) {
      if (this.eventPool.length) {
        var i = this.eventPool.pop();
        return this.call(i, t, e, n, r), i;
      }
      return new this(t, e, n, r);
    }
    function Re(t) {
      if (!(t instanceof this)) throw o(Error(279));
      t.destructor(), 10 > this.eventPool.length && this.eventPool.push(t);
    }
    function Fe(t) {
      (t.eventPool = []), (t.getPooled = Le), (t.release = Re);
    }
    i(Ae.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var t = this.nativeEvent;
        t &&
          (t.preventDefault
            ? t.preventDefault()
            : 'unknown' != typeof t.returnValue && (t.returnValue = !1),
          (this.isDefaultPrevented = Pe));
      },
      stopPropagation: function () {
        var t = this.nativeEvent;
        t &&
          (t.stopPropagation
            ? t.stopPropagation()
            : 'unknown' != typeof t.cancelBubble && (t.cancelBubble = !0),
          (this.isPropagationStopped = Pe));
      },
      persist: function () {
        this.isPersistent = Pe;
      },
      isPersistent: Oe,
      destructor: function () {
        var t,
          e = this.constructor.Interface;
        for (t in e) this[t] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = Oe),
          (this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      (Ae.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (t) {
          return t.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (Ae.extend = function (t) {
        function e() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        e.prototype = r.prototype;
        var a = new e();
        return (
          i(a, n.prototype),
          (n.prototype = a),
          (n.prototype.constructor = n),
          (n.Interface = i({}, r.Interface, t)),
          (n.extend = r.extend),
          Fe(n),
          n
        );
      }),
      Fe(Ae);
    var ze = Ae.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      Ie = Ae.extend({
        clipboardData: function (t) {
          return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
        },
      }),
      je = Ae.extend({ view: null, detail: null }),
      Ue = je.extend({ relatedTarget: null });
    function De(t) {
      var e = t.keyCode;
      return (
        'charCode' in t
          ? 0 === (t = t.charCode) && 13 === e && (t = 13)
          : (t = e),
        10 === t && (t = 13),
        32 <= t || 13 === t ? t : 0
      );
    }
    var He = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      We = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      $e = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function Ye(t) {
      var e = this.nativeEvent;
      return e.getModifierState
        ? e.getModifierState(t)
        : !!(t = $e[t]) && !!e[t];
    }
    function Be() {
      return Ye;
    }
    for (
      var qe = je.extend({
          key: function (t) {
            if (t.key) {
              var e = He[t.key] || t.key;
              if ('Unidentified' !== e) return e;
            }
            return 'keypress' === t.type
              ? 13 === (t = De(t))
                ? 'Enter'
                : String.fromCharCode(t)
              : 'keydown' === t.type || 'keyup' === t.type
              ? We[t.keyCode] || 'Unidentified'
              : '';
          },
          location: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          repeat: null,
          locale: null,
          getModifierState: Be,
          charCode: function (t) {
            return 'keypress' === t.type ? De(t) : 0;
          },
          keyCode: function (t) {
            return 'keydown' === t.type || 'keyup' === t.type ? t.keyCode : 0;
          },
          which: function (t) {
            return 'keypress' === t.type
              ? De(t)
              : 'keydown' === t.type || 'keyup' === t.type
              ? t.keyCode
              : 0;
          },
        }),
        Ve = 0,
        Xe = 0,
        Qe = !1,
        Ke = !1,
        Ge = je.extend({
          screenX: null,
          screenY: null,
          clientX: null,
          clientY: null,
          pageX: null,
          pageY: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          getModifierState: Be,
          button: null,
          buttons: null,
          relatedTarget: function (t) {
            return (
              t.relatedTarget ||
              (t.fromElement === t.srcElement ? t.toElement : t.fromElement)
            );
          },
          movementX: function (t) {
            if (('movementX' in t)) return t.movementX;
            var e = Ve;
            return (
              (Ve = t.screenX),
              Qe ? ('mousemove' === t.type ? t.screenX - e : 0) : ((Qe = !0), 0)
            );
          },
          movementY: function (t) {
            if (('movementY' in t)) return t.movementY;
            var e = Xe;
            return (
              (Xe = t.screenY),
              Ke ? ('mousemove' === t.type ? t.screenY - e : 0) : ((Ke = !0), 0)
            );
          },
        }),
        Ze = Ge.extend({
          pointerId: null,
          width: null,
          height: null,
          pressure: null,
          tangentialPressure: null,
          tiltX: null,
          tiltY: null,
          twist: null,
          pointerType: null,
          isPrimary: null,
        }),
        Je = Ge.extend({ dataTransfer: null }),
        tn = je.extend({
          touches: null,
          targetTouches: null,
          changedTouches: null,
          altKey: null,
          metaKey: null,
          ctrlKey: null,
          shiftKey: null,
          getModifierState: Be,
        }),
        en = Ae.extend({
          propertyName: null,
          elapsedTime: null,
          pseudoElement: null,
        }),
        nn = Ge.extend({
          deltaX: function (t) {
            return ('deltaX' in t)
              ? t.deltaX
              : ('wheelDeltaX' in t)
              ? -t.wheelDeltaX
              : 0;
          },
          deltaY: function (t) {
            return ('deltaY' in t)
              ? t.deltaY
              : ('wheelDeltaY' in t)
              ? -t.wheelDeltaY
              : ('wheelDelta' in t)
              ? -t.wheelDelta
              : 0;
          },
          deltaZ: null,
          deltaMode: null,
        }),
        rn = [
          ['blur', 'blur', 0],
          ['cancel', 'cancel', 0],
          ['click', 'click', 0],
          ['close', 'close', 0],
          ['contextmenu', 'contextMenu', 0],
          ['copy', 'copy', 0],
          ['cut', 'cut', 0],
          ['auxclick', 'auxClick', 0],
          ['dblclick', 'doubleClick', 0],
          ['dragend', 'dragEnd', 0],
          ['dragstart', 'dragStart', 0],
          ['drop', 'drop', 0],
          ['focus', 'focus', 0],
          ['input', 'input', 0],
          ['invalid', 'invalid', 0],
          ['keydown', 'keyDown', 0],
          ['keypress', 'keyPress', 0],
          ['keyup', 'keyUp', 0],
          ['mousedown', 'mouseDown', 0],
          ['mouseup', 'mouseUp', 0],
          ['paste', 'paste', 0],
          ['pause', 'pause', 0],
          ['play', 'play', 0],
          ['pointercancel', 'pointerCancel', 0],
          ['pointerdown', 'pointerDown', 0],
          ['pointerup', 'pointerUp', 0],
          ['ratechange', 'rateChange', 0],
          ['reset', 'reset', 0],
          ['seeked', 'seeked', 0],
          ['submit', 'submit', 0],
          ['touchcancel', 'touchCancel', 0],
          ['touchend', 'touchEnd', 0],
          ['touchstart', 'touchStart', 0],
          ['volumechange', 'volumeChange', 0],
          ['drag', 'drag', 1],
          ['dragenter', 'dragEnter', 1],
          ['dragexit', 'dragExit', 1],
          ['dragleave', 'dragLeave', 1],
          ['dragover', 'dragOver', 1],
          ['mousemove', 'mouseMove', 1],
          ['mouseout', 'mouseOut', 1],
          ['mouseover', 'mouseOver', 1],
          ['pointermove', 'pointerMove', 1],
          ['pointerout', 'pointerOut', 1],
          ['pointerover', 'pointerOver', 1],
          ['scroll', 'scroll', 1],
          ['toggle', 'toggle', 1],
          ['touchmove', 'touchMove', 1],
          ['wheel', 'wheel', 1],
          ['abort', 'abort', 2],
          [Qt, 'animationEnd', 2],
          [Kt, 'animationIteration', 2],
          [Gt, 'animationStart', 2],
          ['canplay', 'canPlay', 2],
          ['canplaythrough', 'canPlayThrough', 2],
          ['durationchange', 'durationChange', 2],
          ['emptied', 'emptied', 2],
          ['encrypted', 'encrypted', 2],
          ['ended', 'ended', 2],
          ['error', 'error', 2],
          ['gotpointercapture', 'gotPointerCapture', 2],
          ['load', 'load', 2],
          ['loadeddata', 'loadedData', 2],
          ['loadedmetadata', 'loadedMetadata', 2],
          ['loadstart', 'loadStart', 2],
          ['lostpointercapture', 'lostPointerCapture', 2],
          ['playing', 'playing', 2],
          ['progress', 'progress', 2],
          ['seeking', 'seeking', 2],
          ['stalled', 'stalled', 2],
          ['suspend', 'suspend', 2],
          ['timeupdate', 'timeUpdate', 2],
          [Zt, 'transitionEnd', 2],
          ['waiting', 'waiting', 2],
        ],
        an = {},
        on = {},
        ln = 0;
      ln < rn.length;
      ln++
    ) {
      var un = rn[ln],
        sn = un[0],
        cn = un[1],
        fn = un[2],
        hn = 'on' + (cn[0].toUpperCase() + cn.slice(1)),
        pn = {
          phasedRegistrationNames: { bubbled: hn, captured: hn + 'Capture' },
          dependencies: [sn],
          eventPriority: fn,
        };
      (an[cn] = pn), (on[sn] = pn);
    }
    var dn = {
        eventTypes: an,
        getEventPriority: function (t) {
          return void 0 !== (t = on[t]) ? t.eventPriority : 2;
        },
        extractEvents: function (t, e, n, r, i) {
          if (!(e = on[t])) return null;
          switch (t) {
            case 'keypress':
              if (0 === De(r)) return null;
            case 'keydown':
            case 'keyup':
              t = qe;
              break;
            case 'blur':
            case 'focus':
              t = Ue;
              break;
            case 'click':
              if (2 === r.button) return null;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              t = Ge;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              t = Je;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              t = tn;
              break;
            case Qt:
            case Kt:
            case Gt:
              t = ze;
              break;
            case Zt:
              t = en;
              break;
            case 'scroll':
              t = je;
              break;
            case 'wheel':
              t = nn;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              t = Ie;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              t = Ze;
              break;
            default:
              t = Ae;
          }
          return Ne((n = t.getPooled(e, n, r, i))), n;
        },
      },
      mn = dn.getEventPriority,
      yn = 10,
      vn = [];
    function gn(t) {
      var e = t.targetInst,
        n = e;
      do {
        if (!n) {
          t.ancestors.push(n);
          break;
        }
        var r = n;
        if (3 === r.tag) r = r.stateNode.containerInfo;
        else {
          for (; r.return; ) r = r.return;
          r = 3 !== r.tag ? null : r.stateNode.containerInfo;
        }
        if (!r) break;
        var i = n.tag;
        (5 !== i && 6 !== i) || t.ancestors.push(n), (n = lr(r));
      } while (n);
      for (n = 0; n < t.ancestors.length; n++) {
        e = t.ancestors[n];
        var a = ke(t.nativeEvent);
        (r = t.topLevelType), (i = t.eventSystemFlags);
        for (var o = t.nativeEvent, l = null, u = 0; u < f.length; u++) {
          var s = f[u];
          s && (s = s.extractEvents(r, i, e, o, a)) && (l = S(l, s));
        }
        P(l);
      }
    }
    var _n = !0;
    function bn(t, e) {
      wn(e, t, !1);
    }
    function wn(t, e, n) {
      switch (mn(e)) {
        case 0:
          var r = xn.bind(null, e, 1);
          break;
        case 1:
          r = kn.bind(null, e, 1);
          break;
        default:
          r = Tn.bind(null, e, 1);
      }
      n ? t.addEventListener(e, r, !0) : t.addEventListener(e, r, !1);
    }
    function xn(t, e, n) {
      ct || ut();
      var r = Tn,
        i = ct;
      ct = !0;
      try {
        lt(r, t, e, n);
      } finally {
        (ct = i) || ht();
      }
    }
    function kn(t, e, n) {
      Tn(t, e, n);
    }
    function En(t, e, n, r) {
      if (vn.length) {
        var i = vn.pop();
        (i.topLevelType = t),
          (i.eventSystemFlags = e),
          (i.nativeEvent = n),
          (i.targetInst = r),
          (t = i);
      } else
        t = {
          topLevelType: t,
          eventSystemFlags: e,
          nativeEvent: n,
          targetInst: r,
          ancestors: [],
        };
      try {
        if (((e = gn), (n = t), ft)) e(n, void 0);
        else {
          ft = !0;
          try {
            st(e, n, void 0);
          } finally {
            (ft = !1), ht();
          }
        }
      } finally {
        (t.topLevelType = null),
          (t.nativeEvent = null),
          (t.targetInst = null),
          (t.ancestors.length = 0),
          vn.length < yn && vn.push(t);
      }
    }
    function Tn(t, e, n) {
      if (_n)
        if (0 < ee.length && -1 < le.indexOf(t))
          (t = se(null, t, e, n)), ee.push(t);
        else {
          var r = Sn(t, e, n);
          null === r
            ? ce(t, n)
            : -1 < le.indexOf(t)
            ? ((t = se(r, t, e, n)), ee.push(t))
            : (function (t, e, n, r) {
                switch (e) {
                  case 'focus':
                    return (ne = fe(ne, t, e, n, r)), !0;
                  case 'dragenter':
                    return (re = fe(re, t, e, n, r)), !0;
                  case 'mouseover':
                    return (ie = fe(ie, t, e, n, r)), !0;
                  case 'pointerover':
                    var i = r.pointerId;
                    return ae.set(i, fe(ae.get(i) || null, t, e, n, r)), !0;
                  case 'gotpointercapture':
                    return (
                      (i = r.pointerId),
                      oe.set(i, fe(oe.get(i) || null, t, e, n, r)),
                      !0
                    );
                }
                return !1;
              })(r, t, e, n) || (ce(t, n), En(t, e, n, null));
        }
    }
    function Sn(t, e, n) {
      var r = ke(n),
        i = lr(r);
      if (null !== i)
        if (null === (r = be(i))) i = null;
        else {
          var a = r.tag;
          if (13 === a) {
            if (
              null !==
              (r =
                13 !== r.tag ||
                (null === (i = r.memoizedState) &&
                  null !== (r = r.alternate) &&
                  (i = r.memoizedState),
                null === i)
                  ? null
                  : i.dehydrated)
            )
              return r;
            i = null;
          } else if (3 === a) {
            if (r.stateNode.hydrate)
              return 3 === r.tag ? r.stateNode.containerInfo : null;
            i = null;
          } else r !== i && (i = null);
        }
      return En(t, e, n, i), null;
    }
    function Cn(t) {
      if (!J) return !1;
      var e = (t = 'on' + t) in document;
      return (
        e ||
          ((e = document.createElement('div')).setAttribute(t, 'return;'),
          (e = 'function' == typeof e[t])),
        e
      );
    }
    var Mn = new ('function' == typeof WeakMap ? WeakMap : Map)();
    function Nn(t) {
      var e = Mn.get(t);
      return void 0 === e && ((e = new Set()), Mn.set(t, e)), e;
    }
    function Pn(t, e, n) {
      if (!n.has(t)) {
        switch (t) {
          case 'scroll':
            wn(e, 'scroll', !0);
            break;
          case 'focus':
          case 'blur':
            wn(e, 'focus', !0),
              wn(e, 'blur', !0),
              n.add('blur'),
              n.add('focus');
            break;
          case 'cancel':
          case 'close':
            Cn(t) && wn(e, t, !0);
            break;
          case 'invalid':
          case 'submit':
          case 'reset':
            break;
          default:
            -1 === Jt.indexOf(t) && bn(t, e);
        }
        n.add(t);
      }
    }
    var On = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      An = ['Webkit', 'ms', 'Moz', 'O'];
    function Ln(t, e, n) {
      return null == e || 'boolean' == typeof e || '' === e
        ? ''
        : n ||
          'number' != typeof e ||
          0 === e ||
          (On.hasOwnProperty(t) && On[t])
        ? ('' + e).trim()
        : e + 'px';
    }
    function Rn(t, e) {
      for (var n in ((t = t.style), e))
        if (e.hasOwnProperty(n)) {
          var r = 0 === n.indexOf('--'),
            i = Ln(n, e[n], r);
          'float' === n && (n = 'cssFloat'),
            r ? t.setProperty(n, i) : (t[n] = i);
        }
    }
    Object.keys(On).forEach(function (t) {
      An.forEach(function (e) {
        (e = e + t.charAt(0).toUpperCase() + t.substring(1)), (On[e] = On[t]);
      });
    });
    var Fn = i(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function zn(t, e) {
      if (e) {
        if (Fn[t] && (null != e.children || null != e.dangerouslySetInnerHTML))
          throw o(Error(137), t, '');
        if (null != e.dangerouslySetInnerHTML) {
          if (null != e.children) throw o(Error(60));
          if (
            !(
              'object' == typeof e.dangerouslySetInnerHTML &&
              '__html' in e.dangerouslySetInnerHTML
            )
          )
            throw o(Error(61));
        }
        if (null != e.style && 'object' != typeof e.style)
          throw o(Error(62), '');
      }
    }
    function In(t, e) {
      if (-1 === t.indexOf('-')) return 'string' == typeof e.is;
      switch (t) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    function jn(t, e) {
      var n = Nn(
        (t = 9 === t.nodeType || 11 === t.nodeType ? t : t.ownerDocument)
      );
      e = d[e];
      for (var r = 0; r < e.length; r++) Pn(e[r], t, n);
    }
    function Un() {}
    function Dn(t) {
      if (
        void 0 ===
        (t = t || ('undefined' != typeof document ? document : void 0))
      )
        return null;
      try {
        return t.activeElement || t.body;
      } catch (e) {
        return t.body;
      }
    }
    function Hn(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function Wn(t, e) {
      var n,
        r = Hn(t);
      for (t = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = t + r.textContent.length), t <= e && n >= e))
            return { node: r, offset: e - t };
          t = n;
        }
        t: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break t;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = Hn(r);
      }
    }
    function $n() {
      for (var t = window, e = Dn(); e instanceof t.HTMLIFrameElement; ) {
        try {
          var n = 'string' == typeof e.contentWindow.location.href;
        } catch (t) {
          n = !1;
        }
        if (!n) break;
        e = Dn((t = e.contentWindow).document);
      }
      return e;
    }
    function Yn(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return (
        e &&
        (('input' === e &&
          ('text' === t.type ||
            'search' === t.type ||
            'tel' === t.type ||
            'url' === t.type ||
            'password' === t.type)) ||
          'textarea' === e ||
          'true' === t.contentEditable)
      );
    }
    var Bn = '$',
      qn = '/$',
      Vn = '$?',
      Xn = '$!',
      Qn = null,
      Kn = null;
    function Gn(t, e) {
      switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          return !!e.autoFocus;
      }
      return !1;
    }
    function Zn(t, e) {
      return (
        'textarea' === t ||
        'option' === t ||
        'noscript' === t ||
        'string' == typeof e.children ||
        'number' == typeof e.children ||
        ('object' == typeof e.dangerouslySetInnerHTML &&
          null !== e.dangerouslySetInnerHTML &&
          null != e.dangerouslySetInnerHTML.__html)
      );
    }
    var Jn = 'function' == typeof setTimeout ? setTimeout : void 0,
      tr = 'function' == typeof clearTimeout ? clearTimeout : void 0;
    function er(t) {
      for (; null != t; t = t.nextSibling) {
        var e = t.nodeType;
        if (1 === e || 3 === e) break;
      }
      return t;
    }
    function nr(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (8 === t.nodeType) {
          var n = t.data;
          if (n === Bn || n === Xn || n === Vn) {
            if (0 === e) return t;
            e--;
          } else n === qn && e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    var rr = Math.random().toString(36).slice(2),
      ir = '__reactInternalInstance$' + rr,
      ar = '__reactEventHandlers$' + rr,
      or = '__reactContainere$' + rr;
    function lr(t) {
      var e = t[ir];
      if (e) return e;
      for (var n = t.parentNode; n; ) {
        if ((e = n[or] || n[ir])) {
          if (
            ((n = e.alternate),
            null !== e.child || (null !== n && null !== n.child))
          )
            for (t = nr(t); null !== t; ) {
              if ((n = t[ir])) return n;
              t = nr(t);
            }
          return e;
        }
        n = (t = n).parentNode;
      }
      return null;
    }
    function ur(t) {
      return !(t = t[ir] || t[or]) ||
        (5 !== t.tag && 6 !== t.tag && 13 !== t.tag && 3 !== t.tag)
        ? null
        : t;
    }
    function sr(t) {
      if (5 === t.tag || 6 === t.tag) return t.stateNode;
      throw o(Error(33));
    }
    function cr(t) {
      return t[ar] || null;
    }
    var fr = null,
      hr = null,
      pr = null;
    function dr() {
      if (pr) return pr;
      var t,
        e,
        n = hr,
        r = n.length,
        i = 'value' in fr ? fr.value : fr.textContent,
        a = i.length;
      for (t = 0; t < r && n[t] === i[t]; t++);
      var o = r - t;
      for (e = 1; e <= o && n[r - e] === i[a - e]; e++);
      return (pr = i.slice(t, 1 < e ? 1 - e : void 0));
    }
    var mr = Ae.extend({ data: null }),
      yr = Ae.extend({ data: null }),
      vr = [9, 13, 27, 32],
      gr = J && 'CompositionEvent' in window,
      _r = null;
    J && 'documentMode' in document && (_r = document.documentMode);
    var br = J && 'TextEvent' in window && !_r,
      wr = J && (!gr || (_r && 8 < _r && 11 >= _r)),
      xr = String.fromCharCode(32),
      kr = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: 'onBeforeInput',
            captured: 'onBeforeInputCapture',
          },
          dependencies: ['compositionend', 'keypress', 'textInput', 'paste'],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionEnd',
            captured: 'onCompositionEndCapture',
          },
          dependencies: 'blur compositionend keydown keypress keyup mousedown'.split(
            ' '
          ),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionStart',
            captured: 'onCompositionStartCapture',
          },
          dependencies: 'blur compositionstart keydown keypress keyup mousedown'.split(
            ' '
          ),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionUpdate',
            captured: 'onCompositionUpdateCapture',
          },
          dependencies: 'blur compositionupdate keydown keypress keyup mousedown'.split(
            ' '
          ),
        },
      },
      Er = !1;
    function Tr(t, e) {
      switch (t) {
        case 'keyup':
          return -1 !== vr.indexOf(e.keyCode);
        case 'keydown':
          return 229 !== e.keyCode;
        case 'keypress':
        case 'mousedown':
        case 'blur':
          return !0;
        default:
          return !1;
      }
    }
    function Sr(t) {
      return 'object' == typeof (t = t.detail) && 'data' in t ? t.data : null;
    }
    var Cr = !1;
    var Mr = {
        eventTypes: kr,
        extractEvents: function (t, e, n, r, i) {
          var a;
          if (gr)
            t: {
              switch (t) {
                case 'compositionstart':
                  var o = kr.compositionStart;
                  break t;
                case 'compositionend':
                  o = kr.compositionEnd;
                  break t;
                case 'compositionupdate':
                  o = kr.compositionUpdate;
                  break t;
              }
              o = void 0;
            }
          else
            Cr
              ? Tr(t, r) && (o = kr.compositionEnd)
              : 'keydown' === t &&
                229 === r.keyCode &&
                (o = kr.compositionStart);
          return (
            o
              ? (wr &&
                  'ko' !== r.locale &&
                  (Cr || o !== kr.compositionStart
                    ? o === kr.compositionEnd && Cr && (a = dr())
                    : ((hr = 'value' in (fr = i) ? fr.value : fr.textContent),
                      (Cr = !0))),
                (e = mr.getPooled(o, n, r, i)),
                a ? (e.data = a) : null !== (a = Sr(r)) && (e.data = a),
                Ne(e),
                (a = e))
              : (a = null),
            (t = br
              ? (function (t, e) {
                  switch (t) {
                    case 'compositionend':
                      return Sr(e);
                    case 'keypress':
                      return 32 !== e.which ? null : ((Er = !0), xr);
                    case 'textInput':
                      return (t = e.data) === xr && Er ? null : t;
                    default:
                      return null;
                  }
                })(t, r)
              : (function (t, e) {
                  if (Cr)
                    return 'compositionend' === t || (!gr && Tr(t, e))
                      ? ((t = dr()), (pr = hr = fr = null), (Cr = !1), t)
                      : null;
                  switch (t) {
                    case 'paste':
                      return null;
                    case 'keypress':
                      if (
                        !(e.ctrlKey || e.altKey || e.metaKey) ||
                        (e.ctrlKey && e.altKey)
                      ) {
                        if (e.char && 1 < e.char.length) return e.char;
                        if (e.which) return String.fromCharCode(e.which);
                      }
                      return null;
                    case 'compositionend':
                      return wr && 'ko' !== e.locale ? null : e.data;
                    default:
                      return null;
                  }
                })(t, r))
              ? (((n = yr.getPooled(kr.beforeInput, n, r, i)).data = t), Ne(n))
              : (n = null),
            null === a ? n : null === n ? a : [a, n]
          );
        },
      },
      Nr = {
        color: !0,
        date: !0,
        datetime: !0,
        'datetime-local': !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
    function Pr(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return 'input' === e ? !!Nr[t.type] : 'textarea' === e;
    }
    var Or = {
      change: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture',
        },
        dependencies: 'blur change click focus input keydown keyup selectionchange'.split(
          ' '
        ),
      },
    };
    function Ar(t, e, n) {
      return (
        ((t = Ae.getPooled(Or.change, t, e, n)).type = 'change'),
        it(n),
        Ne(t),
        t
      );
    }
    var Lr = null,
      Rr = null;
    function Fr(t) {
      P(t);
    }
    function zr(t) {
      if (Tt(sr(t))) return t;
    }
    function Ir(t, e) {
      if ('change' === t) return e;
    }
    var jr = !1;
    function Ur() {
      Lr && (Lr.detachEvent('onpropertychange', Dr), (Rr = Lr = null));
    }
    function Dr(t) {
      if ('value' === t.propertyName && zr(Rr))
        if (((t = Ar(Rr, t, ke(t))), ct)) P(t);
        else {
          ct = !0;
          try {
            ot(Fr, t);
          } finally {
            (ct = !1), ht();
          }
        }
    }
    function Hr(t, e, n) {
      'focus' === t
        ? (Ur(), (Rr = n), (Lr = e).attachEvent('onpropertychange', Dr))
        : 'blur' === t && Ur();
    }
    function Wr(t) {
      if ('selectionchange' === t || 'keyup' === t || 'keydown' === t)
        return zr(Rr);
    }
    function $r(t, e) {
      if ('click' === t) return zr(e);
    }
    function Yr(t, e) {
      if ('input' === t || 'change' === t) return zr(e);
    }
    J &&
      (jr =
        Cn('input') && (!document.documentMode || 9 < document.documentMode));
    var Br = {
        eventTypes: Or,
        _isInputEventSupported: jr,
        extractEvents: function (t, e, n, r, i) {
          var a = (e = n ? sr(n) : window).nodeName && e.nodeName.toLowerCase();
          if ('select' === a || ('input' === a && 'file' === e.type))
            var o = Ir;
          else if (Pr(e))
            if (jr) o = Yr;
            else {
              o = Wr;
              var l = Hr;
            }
          else
            (a = e.nodeName) &&
              'input' === a.toLowerCase() &&
              ('checkbox' === e.type || 'radio' === e.type) &&
              (o = $r);
          if (o && (o = o(t, n))) return Ar(o, r, i);
          l && l(t, e, n),
            'blur' === t &&
              (t = e._wrapperState) &&
              t.controlled &&
              'number' === e.type &&
              Ot(e, 'number', e.value);
        },
      },
      qr = {
        mouseEnter: {
          registrationName: 'onMouseEnter',
          dependencies: ['mouseout', 'mouseover'],
        },
        mouseLeave: {
          registrationName: 'onMouseLeave',
          dependencies: ['mouseout', 'mouseover'],
        },
        pointerEnter: {
          registrationName: 'onPointerEnter',
          dependencies: ['pointerout', 'pointerover'],
        },
        pointerLeave: {
          registrationName: 'onPointerLeave',
          dependencies: ['pointerout', 'pointerover'],
        },
      },
      Vr = {
        eventTypes: qr,
        extractEvents: function (t, e, n, r, i) {
          var a = 'mouseover' === t || 'pointerover' === t,
            o = 'mouseout' === t || 'pointerout' === t;
          if (
            (a && 0 == (32 & e) && (r.relatedTarget || r.fromElement)) ||
            (!o && !a)
          )
            return null;
          if (
            ((e =
              i.window === i
                ? i
                : (e = i.ownerDocument)
                ? e.defaultView || e.parentWindow
                : window),
            o
              ? ((o = n),
                null !==
                  (n = (n = r.relatedTarget || r.toElement) ? lr(n) : null) &&
                  (n !== (a = be(n)) || (5 !== n.tag && 6 !== n.tag)) &&
                  (n = null))
              : (o = null),
            o === n)
          )
            return null;
          if ('mouseout' === t || 'mouseover' === t)
            var l = Ge,
              u = qr.mouseLeave,
              s = qr.mouseEnter,
              c = 'mouse';
          else
            ('pointerout' !== t && 'pointerover' !== t) ||
              ((l = Ze),
              (u = qr.pointerLeave),
              (s = qr.pointerEnter),
              (c = 'pointer'));
          if (
            ((t = null == o ? e : sr(o)),
            (e = null == n ? e : sr(n)),
            ((u = l.getPooled(u, o, r, i)).type = c + 'leave'),
            (u.target = t),
            (u.relatedTarget = e),
            ((r = l.getPooled(s, n, r, i)).type = c + 'enter'),
            (r.target = e),
            (r.relatedTarget = t),
            (c = n),
            (i = o) && c)
          )
            t: {
              for (s = c, t = 0, o = l = i; o; o = Ee(o)) t++;
              for (o = 0, n = s; n; n = Ee(n)) o++;
              for (; 0 < t - o; ) (l = Ee(l)), t--;
              for (; 0 < o - t; ) (s = Ee(s)), o--;
              for (; t--; ) {
                if (l === s || l === s.alternate) break t;
                (l = Ee(l)), (s = Ee(s));
              }
              l = null;
            }
          else l = null;
          for (
            s = l, l = [];
            i && i !== s && (null === (t = i.alternate) || t !== s);

          )
            l.push(i), (i = Ee(i));
          for (
            i = [];
            c && c !== s && (null === (t = c.alternate) || t !== s);

          )
            i.push(c), (c = Ee(c));
          for (c = 0; c < l.length; c++) Ce(l[c], 'bubbled', u);
          for (c = i.length; 0 < c--; ) Ce(i[c], 'captured', r);
          return [u, r];
        },
      };
    var Xr =
        'function' == typeof Object.is
          ? Object.is
          : function (t, e) {
              return (
                (t === e && (0 !== t || 1 / t == 1 / e)) || (t != t && e != e)
              );
            },
      Qr = Object.prototype.hasOwnProperty;
    function Kr(t, e) {
      if (Xr(t, e)) return !0;
      if (
        'object' != typeof t ||
        null === t ||
        'object' != typeof e ||
        null === e
      )
        return !1;
      var n = Object.keys(t),
        r = Object.keys(e);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!Qr.call(e, n[r]) || !Xr(t[n[r]], e[n[r]])) return !1;
      return !0;
    }
    var Gr = J && 'documentMode' in document && 11 >= document.documentMode,
      Zr = {
        select: {
          phasedRegistrationNames: {
            bubbled: 'onSelect',
            captured: 'onSelectCapture',
          },
          dependencies: 'blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange'.split(
            ' '
          ),
        },
      },
      Jr = null,
      ti = null,
      ei = null,
      ni = !1;
    function ri(t, e) {
      var n =
        e.window === e ? e.document : 9 === e.nodeType ? e : e.ownerDocument;
      return ni || null == Jr || Jr !== Dn(n)
        ? null
        : ('selectionStart' in (n = Jr) && Yn(n)
            ? (n = { start: n.selectionStart, end: n.selectionEnd })
            : (n = {
                anchorNode: (n = (
                  (n.ownerDocument && n.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset,
              }),
          ei && Kr(ei, n)
            ? null
            : ((ei = n),
              ((t = Ae.getPooled(Zr.select, ti, t, e)).type = 'select'),
              (t.target = Jr),
              Ne(t),
              t));
    }
    var ii = {
      eventTypes: Zr,
      extractEvents: function (t, e, n, r, i) {
        var a;
        if (
          !(a = !(e =
            i.window === i
              ? i.document
              : 9 === i.nodeType
              ? i
              : i.ownerDocument))
        ) {
          t: {
            (e = Nn(e)), (a = d.onSelect);
            for (var o = 0; o < a.length; o++)
              if (!e.has(a[o])) {
                e = !1;
                break t;
              }
            e = !0;
          }
          a = !e;
        }
        if (a) return null;
        switch (((e = n ? sr(n) : window), t)) {
          case 'focus':
            (Pr(e) || 'true' === e.contentEditable) &&
              ((Jr = e), (ti = n), (ei = null));
            break;
          case 'blur':
            ei = ti = Jr = null;
            break;
          case 'mousedown':
            ni = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            return (ni = !1), ri(r, i);
          case 'selectionchange':
            if (Gr) break;
          case 'keydown':
          case 'keyup':
            return ri(r, i);
        }
        return null;
      },
    };
    O.injectEventPluginOrder(
      'ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin'.split(
        ' '
      )
    ),
      (x = cr),
      (k = ur),
      (E = sr),
      O.injectEventPluginsByName({
        SimpleEventPlugin: dn,
        EnterLeaveEventPlugin: Vr,
        ChangeEventPlugin: Br,
        SelectEventPlugin: ii,
        BeforeInputEventPlugin: Mr,
      }),
      new Set();
    var ai = [],
      oi = -1;
    function li(t) {
      0 > oi || ((t.current = ai[oi]), (ai[oi] = null), oi--);
    }
    function ui(t, e) {
      (ai[++oi] = t.current), (t.current = e);
    }
    var si = {},
      ci = { current: si },
      fi = { current: !1 },
      hi = si;
    function pi(t, e) {
      var n = t.type.contextTypes;
      if (!n) return si;
      var r = t.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === e)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i,
        a = {};
      for (i in n) a[i] = e[i];
      return (
        r &&
          (((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = e),
          (t.__reactInternalMemoizedMaskedChildContext = a)),
        a
      );
    }
    function di(t) {
      return null != (t = t.childContextTypes);
    }
    function mi(t) {
      li(fi), li(ci);
    }
    function yi(t) {
      li(fi), li(ci);
    }
    function vi(t, e, n) {
      if (ci.current !== si) throw o(Error(168));
      ui(ci, e), ui(fi, n);
    }
    function gi(t, e, n) {
      var r = t.stateNode;
      if (((t = e.childContextTypes), 'function' != typeof r.getChildContext))
        return n;
      for (var a in (r = r.getChildContext()))
        if (!(a in t)) throw o(Error(108), G(e) || 'Unknown', a);
      return i({}, n, {}, r);
    }
    function _i(t) {
      var e = t.stateNode;
      return (
        (e = (e && e.__reactInternalMemoizedMergedChildContext) || si),
        (hi = ci.current),
        ui(ci, e),
        ui(fi, fi.current),
        !0
      );
    }
    function bi(t, e, n) {
      var r = t.stateNode;
      if (!r) throw o(Error(169));
      n
        ? ((e = gi(t, e, hi)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          li(fi),
          li(ci),
          ui(ci, e))
        : li(fi),
        ui(fi, n);
    }
    var wi = a.unstable_runWithPriority,
      xi = a.unstable_scheduleCallback,
      ki = a.unstable_cancelCallback,
      Ei = a.unstable_shouldYield,
      Ti = a.unstable_requestPaint,
      Si = a.unstable_now,
      Ci = a.unstable_getCurrentPriorityLevel,
      Mi = a.unstable_ImmediatePriority,
      Ni = a.unstable_UserBlockingPriority,
      Pi = a.unstable_NormalPriority,
      Oi = a.unstable_LowPriority,
      Ai = a.unstable_IdlePriority,
      Li = {},
      Ri = void 0 !== Ti ? Ti : function () {},
      Fi = null,
      zi = null,
      Ii = !1,
      ji = Si(),
      Ui =
        1e4 > ji
          ? Si
          : function () {
              return Si() - ji;
            };
    function Di() {
      switch (Ci()) {
        case Mi:
          return 99;
        case Ni:
          return 98;
        case Pi:
          return 97;
        case Oi:
          return 96;
        case Ai:
          return 95;
        default:
          throw o(Error(332));
      }
    }
    function Hi(t) {
      switch (t) {
        case 99:
          return Mi;
        case 98:
          return Ni;
        case 97:
          return Pi;
        case 96:
          return Oi;
        case 95:
          return Ai;
        default:
          throw o(Error(332));
      }
    }
    function Wi(t, e) {
      return (t = Hi(t)), wi(t, e);
    }
    function $i(t, e, n) {
      return (t = Hi(t)), xi(t, e, n);
    }
    function Yi(t) {
      return null === Fi ? ((Fi = [t]), (zi = xi(Mi, qi))) : Fi.push(t), Li;
    }
    function Bi() {
      if (null !== zi) {
        var t = zi;
        (zi = null), ki(t);
      }
      qi();
    }
    function qi() {
      if (!Ii && null !== Fi) {
        Ii = !0;
        var t = 0;
        try {
          var e = Fi;
          Wi(99, function () {
            for (; t < e.length; t++) {
              var n = e[t];
              do {
                n = n(!0);
              } while (null !== n);
            }
          }),
            (Fi = null);
        } catch (e) {
          throw (null !== Fi && (Fi = Fi.slice(t + 1)), xi(Mi, Bi), e);
        } finally {
          Ii = !1;
        }
      }
    }
    function Vi(t, e) {
      if (t && t.defaultProps)
        for (var n in ((e = i({}, e)), (t = t.defaultProps)))
          void 0 === e[n] && (e[n] = t[n]);
      return e;
    }
    var Xi = { current: null },
      Qi = null,
      Ki = null,
      Gi = null;
    function Zi() {
      Gi = Ki = Qi = null;
    }
    function Ji(t, e) {
      var n = t.type._context;
      ui(Xi, n._currentValue), (n._currentValue = e);
    }
    function ta(t) {
      var e = Xi.current;
      li(Xi), (t.type._context._currentValue = e);
    }
    function ea(t, e) {
      for (; null !== t; ) {
        var n = t.alternate;
        if (t.childExpirationTime < e)
          (t.childExpirationTime = e),
            null !== n &&
              n.childExpirationTime < e &&
              (n.childExpirationTime = e);
        else {
          if (!(null !== n && n.childExpirationTime < e)) break;
          n.childExpirationTime = e;
        }
        t = t.return;
      }
    }
    function na(t, e) {
      (Qi = t),
        (Gi = Ki = null),
        null !== (t = t.dependencies) &&
          null !== t.firstContext &&
          (t.expirationTime >= e && (Po = !0), (t.firstContext = null));
    }
    function ra(t, e) {
      if (Gi !== t && !1 !== e && 0 !== e)
        if (
          (('number' == typeof e && 1073741823 !== e) ||
            ((Gi = t), (e = 1073741823)),
          (e = { context: t, observedBits: e, next: null }),
          null === Ki)
        ) {
          if (null === Qi) throw o(Error(308));
          (Ki = e),
            (Qi.dependencies = {
              expirationTime: 0,
              firstContext: e,
              responders: null,
            });
        } else Ki = Ki.next = e;
      return t._currentValue;
    }
    var ia = !1;
    function aa(t) {
      return {
        baseState: t,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function oa(t) {
      return {
        baseState: t.baseState,
        firstUpdate: t.firstUpdate,
        lastUpdate: t.lastUpdate,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function la(t, e) {
      return {
        expirationTime: t,
        suspenseConfig: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null,
      };
    }
    function ua(t, e) {
      null === t.lastUpdate
        ? (t.firstUpdate = t.lastUpdate = e)
        : ((t.lastUpdate.next = e), (t.lastUpdate = e));
    }
    function sa(t, e) {
      var n = t.alternate;
      if (null === n) {
        var r = t.updateQueue,
          i = null;
        null === r && (r = t.updateQueue = aa(t.memoizedState));
      } else
        (r = t.updateQueue),
          (i = n.updateQueue),
          null === r
            ? null === i
              ? ((r = t.updateQueue = aa(t.memoizedState)),
                (i = n.updateQueue = aa(n.memoizedState)))
              : (r = t.updateQueue = oa(i))
            : null === i && (i = n.updateQueue = oa(r));
      null === i || r === i
        ? ua(r, e)
        : null === r.lastUpdate || null === i.lastUpdate
        ? (ua(r, e), ua(i, e))
        : (ua(r, e), (i.lastUpdate = e));
    }
    function ca(t, e) {
      var n = t.updateQueue;
      null ===
      (n = null === n ? (t.updateQueue = aa(t.memoizedState)) : fa(t, n))
        .lastCapturedUpdate
        ? (n.firstCapturedUpdate = n.lastCapturedUpdate = e)
        : ((n.lastCapturedUpdate.next = e), (n.lastCapturedUpdate = e));
    }
    function fa(t, e) {
      var n = t.alternate;
      return (
        null !== n && e === n.updateQueue && (e = t.updateQueue = oa(e)), e
      );
    }
    function ha(t, e, n, r, a, o) {
      switch (n.tag) {
        case 1:
          return 'function' == typeof (t = n.payload) ? t.call(o, r, a) : t;
        case 3:
          t.effectTag = (-4097 & t.effectTag) | 64;
        case 0:
          if (
            null ==
            (a = 'function' == typeof (t = n.payload) ? t.call(o, r, a) : t)
          )
            break;
          return i({}, r, a);
        case 2:
          ia = !0;
      }
      return r;
    }
    function pa(t, e, n, r, i) {
      ia = !1;
      for (
        var a = (e = fa(t, e)).baseState,
          o = null,
          l = 0,
          u = e.firstUpdate,
          s = a;
        null !== u;

      ) {
        var c = u.expirationTime;
        c < i
          ? (null === o && ((o = u), (a = s)), l < c && (l = c))
          : (yu(c, u.suspenseConfig),
            (s = ha(t, 0, u, s, n, r)),
            null !== u.callback &&
              ((t.effectTag |= 32),
              (u.nextEffect = null),
              null === e.lastEffect
                ? (e.firstEffect = e.lastEffect = u)
                : ((e.lastEffect.nextEffect = u), (e.lastEffect = u)))),
          (u = u.next);
      }
      for (c = null, u = e.firstCapturedUpdate; null !== u; ) {
        var f = u.expirationTime;
        f < i
          ? (null === c && ((c = u), null === o && (a = s)), l < f && (l = f))
          : ((s = ha(t, 0, u, s, n, r)),
            null !== u.callback &&
              ((t.effectTag |= 32),
              (u.nextEffect = null),
              null === e.lastCapturedEffect
                ? (e.firstCapturedEffect = e.lastCapturedEffect = u)
                : ((e.lastCapturedEffect.nextEffect = u),
                  (e.lastCapturedEffect = u)))),
          (u = u.next);
      }
      null === o && (e.lastUpdate = null),
        null === c ? (e.lastCapturedUpdate = null) : (t.effectTag |= 32),
        null === o && null === c && (a = s),
        (e.baseState = a),
        (e.firstUpdate = o),
        (e.firstCapturedUpdate = c),
        vu(l),
        (t.expirationTime = l),
        (t.memoizedState = s);
    }
    function da(t, e, n) {
      null !== e.firstCapturedUpdate &&
        (null !== e.lastUpdate &&
          ((e.lastUpdate.next = e.firstCapturedUpdate),
          (e.lastUpdate = e.lastCapturedUpdate)),
        (e.firstCapturedUpdate = e.lastCapturedUpdate = null)),
        ma(e.firstEffect, n),
        (e.firstEffect = e.lastEffect = null),
        ma(e.firstCapturedEffect, n),
        (e.firstCapturedEffect = e.lastCapturedEffect = null);
    }
    function ma(t, e) {
      for (; null !== t; ) {
        var n = t.callback;
        if (null !== n) {
          t.callback = null;
          var r = e;
          if ('function' != typeof n) throw o(Error(191), n);
          n.call(r);
        }
        t = t.nextEffect;
      }
    }
    var ya = L.ReactCurrentBatchConfig,
      va = new r.Component().refs;
    function ga(t, e, n, r) {
      (n = null == (n = n(r, (e = t.memoizedState))) ? e : i({}, e, n)),
        (t.memoizedState = n),
        null !== (r = t.updateQueue) &&
          0 === t.expirationTime &&
          (r.baseState = n);
    }
    var _a = {
      isMounted: function (t) {
        return !!(t = t._reactInternalFiber) && be(t) === t;
      },
      enqueueSetState: function (t, e, n) {
        t = t._reactInternalFiber;
        var r = Zl(),
          i = ya.suspense;
        ((i = la((r = Jl(r, t, i)), i)).payload = e),
          null != n && (i.callback = n),
          sa(t, i),
          nu(t, r);
      },
      enqueueReplaceState: function (t, e, n) {
        t = t._reactInternalFiber;
        var r = Zl(),
          i = ya.suspense;
        ((i = la((r = Jl(r, t, i)), i)).tag = 1),
          (i.payload = e),
          null != n && (i.callback = n),
          sa(t, i),
          nu(t, r);
      },
      enqueueForceUpdate: function (t, e) {
        t = t._reactInternalFiber;
        var n = Zl(),
          r = ya.suspense;
        ((r = la((n = Jl(n, t, r)), r)).tag = 2),
          null != e && (r.callback = e),
          sa(t, r),
          nu(t, n);
      },
    };
    function ba(t, e, n, r, i, a, o) {
      return 'function' == typeof (t = t.stateNode).shouldComponentUpdate
        ? t.shouldComponentUpdate(r, a, o)
        : !e.prototype ||
            !e.prototype.isPureReactComponent ||
            !Kr(n, r) ||
            !Kr(i, a);
    }
    function wa(t, e, n) {
      var r = !1,
        i = si,
        a = e.contextType;
      return (
        'object' == typeof a && null !== a
          ? (a = ra(a))
          : ((i = di(e) ? hi : ci.current),
            (a = (r = null != (r = e.contextTypes)) ? pi(t, i) : si)),
        (e = new e(n, a)),
        (t.memoizedState =
          null !== e.state && void 0 !== e.state ? e.state : null),
        (e.updater = _a),
        (t.stateNode = e),
        (e._reactInternalFiber = t),
        r &&
          (((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = i),
          (t.__reactInternalMemoizedMaskedChildContext = a)),
        e
      );
    }
    function xa(t, e, n, r) {
      (t = e.state),
        'function' == typeof e.componentWillReceiveProps &&
          e.componentWillReceiveProps(n, r),
        'function' == typeof e.UNSAFE_componentWillReceiveProps &&
          e.UNSAFE_componentWillReceiveProps(n, r),
        e.state !== t && _a.enqueueReplaceState(e, e.state, null);
    }
    function ka(t, e, n, r) {
      var i = t.stateNode;
      (i.props = n), (i.state = t.memoizedState), (i.refs = va);
      var a = e.contextType;
      'object' == typeof a && null !== a
        ? (i.context = ra(a))
        : ((a = di(e) ? hi : ci.current), (i.context = pi(t, a))),
        null !== (a = t.updateQueue) &&
          (pa(t, a, n, i, r), (i.state = t.memoizedState)),
        'function' == typeof (a = e.getDerivedStateFromProps) &&
          (ga(t, e, a, n), (i.state = t.memoizedState)),
        'function' == typeof e.getDerivedStateFromProps ||
          'function' == typeof i.getSnapshotBeforeUpdate ||
          ('function' != typeof i.UNSAFE_componentWillMount &&
            'function' != typeof i.componentWillMount) ||
          ((e = i.state),
          'function' == typeof i.componentWillMount && i.componentWillMount(),
          'function' == typeof i.UNSAFE_componentWillMount &&
            i.UNSAFE_componentWillMount(),
          e !== i.state && _a.enqueueReplaceState(i, i.state, null),
          null !== (a = t.updateQueue) &&
            (pa(t, a, n, i, r), (i.state = t.memoizedState))),
        'function' == typeof i.componentDidMount && (t.effectTag |= 4);
    }
    var Ea = Array.isArray;
    function Ta(t, e, n) {
      if (
        null !== (t = n.ref) &&
        'function' != typeof t &&
        'object' != typeof t
      ) {
        if (n._owner) {
          if ((n = n._owner)) {
            if (1 !== n.tag) throw o(Error(309));
            var r = n.stateNode;
          }
          if (!r) throw o(Error(147), t);
          var i = '' + t;
          return null !== e &&
            null !== e.ref &&
            'function' == typeof e.ref &&
            e.ref._stringRef === i
            ? e.ref
            : (((e = function (t) {
                var e = r.refs;
                e === va && (e = r.refs = {}),
                  null === t ? delete e[i] : (e[i] = t);
              })._stringRef = i),
              e);
        }
        if ('string' != typeof t) throw o(Error(284));
        if (!n._owner) throw o(Error(290), t);
      }
      return t;
    }
    function Sa(t, e) {
      if ('textarea' !== t.type)
        throw o(
          Error(31),
          '[object Object]' === Object.prototype.toString.call(e)
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : e,
          ''
        );
    }
    function Ca(t) {
      function e(e, n) {
        if (t) {
          var r = e.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (e.lastEffect = n))
            : (e.firstEffect = e.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!t) return null;
        for (; null !== r; ) e(n, r), (r = r.sibling);
        return null;
      }
      function r(t, e) {
        for (t = new Map(); null !== e; )
          null !== e.key ? t.set(e.key, e) : t.set(e.index, e), (e = e.sibling);
        return t;
      }
      function i(t, e, n) {
        return ((t = Iu(t, e)).index = 0), (t.sibling = null), t;
      }
      function a(e, n, r) {
        return (
          (e.index = r),
          t
            ? null !== (r = e.alternate)
              ? (r = r.index) < n
                ? ((e.effectTag = ge), n)
                : r
              : ((e.effectTag = ge), n)
            : n
        );
      }
      function l(e) {
        return t && null === e.alternate && (e.effectTag = ge), e;
      }
      function u(t, e, n, r) {
        return null === e || 6 !== e.tag
          ? (((e = Du(n, t.mode, r)).return = t), e)
          : (((e = i(e, n)).return = t), e);
      }
      function s(t, e, n, r) {
        return null !== e && e.elementType === n.type
          ? (((r = i(e, n.props)).ref = Ta(t, e, n)), (r.return = t), r)
          : (((r = ju(n.type, n.key, n.props, null, t.mode, r)).ref = Ta(
              t,
              e,
              n
            )),
            (r.return = t),
            r);
      }
      function c(t, e, n, r) {
        return null === e ||
          4 !== e.tag ||
          e.stateNode.containerInfo !== n.containerInfo ||
          e.stateNode.implementation !== n.implementation
          ? (((e = Hu(n, t.mode, r)).return = t), e)
          : (((e = i(e, n.children || [])).return = t), e);
      }
      function f(t, e, n, r, a) {
        return null === e || 7 !== e.tag
          ? (((e = Uu(n, t.mode, r, a)).return = t), e)
          : (((e = i(e, n)).return = t), e);
      }
      function h(t, e, n) {
        if ('string' == typeof e || 'number' == typeof e)
          return ((e = Du('' + e, t.mode, n)).return = t), e;
        if ('object' == typeof e && null !== e) {
          switch (e.$$typeof) {
            case z:
              return (
                ((n = ju(e.type, e.key, e.props, null, t.mode, n)).ref = Ta(
                  t,
                  null,
                  e
                )),
                (n.return = t),
                n
              );
            case I:
              return ((e = Hu(e, t.mode, n)).return = t), e;
          }
          if (Ea(e) || K(e))
            return ((e = Uu(e, t.mode, n, null)).return = t), e;
          Sa(t, e);
        }
        return null;
      }
      function p(t, e, n, r) {
        var i = null !== e ? e.key : null;
        if ('string' == typeof n || 'number' == typeof n)
          return null !== i ? null : u(t, e, '' + n, r);
        if ('object' == typeof n && null !== n) {
          switch (n.$$typeof) {
            case z:
              return n.key === i
                ? n.type === j
                  ? f(t, e, n.props.children, r, i)
                  : s(t, e, n, r)
                : null;
            case I:
              return n.key === i ? c(t, e, n, r) : null;
          }
          if (Ea(n) || K(n)) return null !== i ? null : f(t, e, n, r, null);
          Sa(t, n);
        }
        return null;
      }
      function d(t, e, n, r, i) {
        if ('string' == typeof r || 'number' == typeof r)
          return u(e, (t = t.get(n) || null), '' + r, i);
        if ('object' == typeof r && null !== r) {
          switch (r.$$typeof) {
            case z:
              return (
                (t = t.get(null === r.key ? n : r.key) || null),
                r.type === j
                  ? f(e, t, r.props.children, i, r.key)
                  : s(e, t, r, i)
              );
            case I:
              return c(
                e,
                (t = t.get(null === r.key ? n : r.key) || null),
                r,
                i
              );
          }
          if (Ea(r) || K(r)) return f(e, (t = t.get(n) || null), r, i, null);
          Sa(e, r);
        }
        return null;
      }
      function m(i, o, l, u) {
        for (
          var s = null, c = null, f = o, m = (o = 0), y = null;
          null !== f && m < l.length;
          m++
        ) {
          f.index > m ? ((y = f), (f = null)) : (y = f.sibling);
          var v = p(i, f, l[m], u);
          if (null === v) {
            null === f && (f = y);
            break;
          }
          t && f && null === v.alternate && e(i, f),
            (o = a(v, o, m)),
            null === c ? (s = v) : (c.sibling = v),
            (c = v),
            (f = y);
        }
        if (m === l.length) return n(i, f), s;
        if (null === f) {
          for (; m < l.length; m++)
            null !== (f = h(i, l[m], u)) &&
              ((o = a(f, o, m)),
              null === c ? (s = f) : (c.sibling = f),
              (c = f));
          return s;
        }
        for (f = r(i, f); m < l.length; m++)
          null !== (y = d(f, i, m, l[m], u)) &&
            (t && null !== y.alternate && f.delete(null === y.key ? m : y.key),
            (o = a(y, o, m)),
            null === c ? (s = y) : (c.sibling = y),
            (c = y));
        return (
          t &&
            f.forEach(function (t) {
              return e(i, t);
            }),
          s
        );
      }
      function y(i, l, u, s) {
        var c = K(u);
        if ('function' != typeof c) throw o(Error(150));
        if (null == (u = c.call(u))) throw o(Error(151));
        for (
          var f = (c = null), m = l, y = (l = 0), v = null, g = u.next();
          null !== m && !g.done;
          y++, g = u.next()
        ) {
          m.index > y ? ((v = m), (m = null)) : (v = m.sibling);
          var _ = p(i, m, g.value, s);
          if (null === _) {
            null === m && (m = v);
            break;
          }
          t && m && null === _.alternate && e(i, m),
            (l = a(_, l, y)),
            null === f ? (c = _) : (f.sibling = _),
            (f = _),
            (m = v);
        }
        if (g.done) return n(i, m), c;
        if (null === m) {
          for (; !g.done; y++, g = u.next())
            null !== (g = h(i, g.value, s)) &&
              ((l = a(g, l, y)),
              null === f ? (c = g) : (f.sibling = g),
              (f = g));
          return c;
        }
        for (m = r(i, m); !g.done; y++, g = u.next())
          null !== (g = d(m, i, y, g.value, s)) &&
            (t && null !== g.alternate && m.delete(null === g.key ? y : g.key),
            (l = a(g, l, y)),
            null === f ? (c = g) : (f.sibling = g),
            (f = g));
        return (
          t &&
            m.forEach(function (t) {
              return e(i, t);
            }),
          c
        );
      }
      return function (t, r, a, u) {
        var s =
          'object' == typeof a && null !== a && a.type === j && null === a.key;
        s && (a = a.props.children);
        var c = 'object' == typeof a && null !== a;
        if (c)
          switch (a.$$typeof) {
            case z:
              t: {
                for (c = a.key, s = r; null !== s; ) {
                  if (s.key === c) {
                    if (7 === s.tag ? a.type === j : s.elementType === a.type) {
                      n(t, s.sibling),
                        ((r = i(
                          s,
                          a.type === j ? a.props.children : a.props
                        )).ref = Ta(t, s, a)),
                        (r.return = t),
                        (t = r);
                      break t;
                    }
                    n(t, s);
                    break;
                  }
                  e(t, s), (s = s.sibling);
                }
                a.type === j
                  ? (((r = Uu(a.props.children, t.mode, u, a.key)).return = t),
                    (t = r))
                  : (((u = ju(
                      a.type,
                      a.key,
                      a.props,
                      null,
                      t.mode,
                      u
                    )).ref = Ta(t, r, a)),
                    (u.return = t),
                    (t = u));
              }
              return l(t);
            case I:
              t: {
                for (s = a.key; null !== r; ) {
                  if (r.key === s) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      n(t, r.sibling),
                        ((r = i(r, a.children || [])).return = t),
                        (t = r);
                      break t;
                    }
                    n(t, r);
                    break;
                  }
                  e(t, r), (r = r.sibling);
                }
                ((r = Hu(a, t.mode, u)).return = t), (t = r);
              }
              return l(t);
          }
        if ('string' == typeof a || 'number' == typeof a)
          return (
            (a = '' + a),
            null !== r && 6 === r.tag
              ? (n(t, r.sibling), ((r = i(r, a)).return = t), (t = r))
              : (n(t, r), ((r = Du(a, t.mode, u)).return = t), (t = r)),
            l(t)
          );
        if (Ea(a)) return m(t, r, a, u);
        if (K(a)) return y(t, r, a, u);
        if ((c && Sa(t, a), void 0 === a && !s))
          switch (t.tag) {
            case 1:
            case 0:
              throw (
                ((t = t.type),
                o(Error(152), t.displayName || t.name || 'Component'))
              );
          }
        return n(t, r);
      };
    }
    var Ma = Ca(!0),
      Na = Ca(!1),
      Pa = {},
      Oa = { current: Pa },
      Aa = { current: Pa },
      La = { current: Pa };
    function Ra(t) {
      if (t === Pa) throw o(Error(174));
      return t;
    }
    function Fa(t, e) {
      ui(La, e), ui(Aa, t), ui(Oa, Pa);
      var n = e.nodeType;
      switch (n) {
        case 9:
        case 11:
          e = (e = e.documentElement) ? e.namespaceURI : Dt(null, '');
          break;
        default:
          e = Dt(
            (e = (n = 8 === n ? e.parentNode : e).namespaceURI || null),
            (n = n.tagName)
          );
      }
      li(Oa), ui(Oa, e);
    }
    function za(t) {
      li(Oa), li(Aa), li(La);
    }
    function Ia(t) {
      Ra(La.current);
      var e = Ra(Oa.current),
        n = Dt(e, t.type);
      e !== n && (ui(Aa, t), ui(Oa, n));
    }
    function ja(t) {
      Aa.current === t && (li(Oa), li(Aa));
    }
    var Ua = { current: 0 };
    function Da(t) {
      for (var e = t; null !== e; ) {
        if (13 === e.tag) {
          var n = e.memoizedState;
          if (
            null !== n &&
            (null === (n = n.dehydrated) || n.data === Vn || n.data === Xn)
          )
            return e;
        } else if (19 === e.tag && void 0 !== e.memoizedProps.revealOrder) {
          if ((64 & e.effectTag) !== ve) return e;
        } else if (null !== e.child) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break;
        for (; null === e.sibling; ) {
          if (null === e.return || e.return === t) return null;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
      return null;
    }
    function Ha(t, e) {
      return { responder: t, props: e };
    }
    var Wa = L.ReactCurrentDispatcher,
      $a = 0,
      Ya = null,
      Ba = null,
      qa = null,
      Va = null,
      Xa = null,
      Qa = null,
      Ka = 0,
      Ga = null,
      Za = 0,
      Ja = !1,
      to = null,
      eo = 0;
    function no() {
      throw o(Error(321));
    }
    function ro(t, e) {
      if (null === e) return !1;
      for (var n = 0; n < e.length && n < t.length; n++)
        if (!Xr(t[n], e[n])) return !1;
      return !0;
    }
    function io(t, e, n, r, i, a) {
      if (
        (($a = a),
        (Ya = e),
        (qa = null !== t ? t.memoizedState : null),
        (Wa.current = null === qa ? go : _o),
        (e = n(r, i)),
        Ja)
      ) {
        do {
          (Ja = !1),
            (eo += 1),
            (qa = null !== t ? t.memoizedState : null),
            (Qa = Va),
            (Ga = Xa = Ba = null),
            (Wa.current = _o),
            (e = n(r, i));
        } while (Ja);
        (to = null), (eo = 0);
      }
      if (
        ((Wa.current = vo),
        ((t = Ya).memoizedState = Va),
        (t.expirationTime = Ka),
        (t.updateQueue = Ga),
        (t.effectTag |= Za),
        (t = null !== Ba && null !== Ba.next),
        ($a = 0),
        (Qa = Xa = Va = qa = Ba = Ya = null),
        (Ka = 0),
        (Ga = null),
        (Za = 0),
        t)
      )
        throw o(Error(300));
      return e;
    }
    function ao() {
      (Wa.current = vo),
        ($a = 0),
        (Qa = Xa = Va = qa = Ba = Ya = null),
        (Ka = 0),
        (Ga = null),
        (Za = 0),
        (Ja = !1),
        (to = null),
        (eo = 0);
    }
    function oo() {
      var t = {
        memoizedState: null,
        baseState: null,
        queue: null,
        baseUpdate: null,
        next: null,
      };
      return null === Xa ? (Va = Xa = t) : (Xa = Xa.next = t), Xa;
    }
    function lo() {
      if (null !== Qa)
        (Qa = (Xa = Qa).next), (qa = null !== (Ba = qa) ? Ba.next : null);
      else {
        if (null === qa) throw o(Error(310));
        var t = {
          memoizedState: (Ba = qa).memoizedState,
          baseState: Ba.baseState,
          queue: Ba.queue,
          baseUpdate: Ba.baseUpdate,
          next: null,
        };
        (Xa = null === Xa ? (Va = t) : (Xa.next = t)), (qa = Ba.next);
      }
      return Xa;
    }
    function uo(t, e) {
      return 'function' == typeof e ? e(t) : e;
    }
    function so(t) {
      var e = lo(),
        n = e.queue;
      if (null === n) throw o(Error(311));
      if (((n.lastRenderedReducer = t), 0 < eo)) {
        var r = n.dispatch;
        if (null !== to) {
          var i = to.get(n);
          if (void 0 !== i) {
            to.delete(n);
            var a = e.memoizedState;
            do {
              (a = t(a, i.action)), (i = i.next);
            } while (null !== i);
            return (
              Xr(a, e.memoizedState) || (Po = !0),
              (e.memoizedState = a),
              e.baseUpdate === n.last && (e.baseState = a),
              (n.lastRenderedState = a),
              [a, r]
            );
          }
        }
        return [e.memoizedState, r];
      }
      r = n.last;
      var l = e.baseUpdate;
      if (
        ((a = e.baseState),
        null !== l
          ? (null !== r && (r.next = null), (r = l.next))
          : (r = null !== r ? r.next : null),
        null !== r)
      ) {
        var u = (i = null),
          s = r,
          c = !1;
        do {
          var f = s.expirationTime;
          f < $a
            ? (c || ((c = !0), (u = l), (i = a)), f > Ka && vu((Ka = f)))
            : (yu(f, s.suspenseConfig),
              (a = s.eagerReducer === t ? s.eagerState : t(a, s.action))),
            (l = s),
            (s = s.next);
        } while (null !== s && s !== r);
        c || ((u = l), (i = a)),
          Xr(a, e.memoizedState) || (Po = !0),
          (e.memoizedState = a),
          (e.baseUpdate = u),
          (e.baseState = i),
          (n.lastRenderedState = a);
      }
      return [e.memoizedState, n.dispatch];
    }
    function co(t, e, n, r) {
      return (
        (t = { tag: t, create: e, destroy: n, deps: r, next: null }),
        null === Ga
          ? ((Ga = { lastEffect: null }).lastEffect = t.next = t)
          : null === (e = Ga.lastEffect)
          ? (Ga.lastEffect = t.next = t)
          : ((n = e.next), (e.next = t), (t.next = n), (Ga.lastEffect = t)),
        t
      );
    }
    function fo(t, e, n, r) {
      var i = oo();
      (Za |= t), (i.memoizedState = co(e, n, void 0, void 0 === r ? null : r));
    }
    function ho(t, e, n, r) {
      var i = lo();
      r = void 0 === r ? null : r;
      var a = void 0;
      if (null !== Ba) {
        var o = Ba.memoizedState;
        if (((a = o.destroy), null !== r && ro(r, o.deps)))
          return void co(0, n, a, r);
      }
      (Za |= t), (i.memoizedState = co(e, n, a, r));
    }
    function po(t, e) {
      return 'function' == typeof e
        ? ((t = t()),
          e(t),
          function () {
            e(null);
          })
        : null != e
        ? ((t = t()),
          (e.current = t),
          function () {
            e.current = null;
          })
        : void 0;
    }
    function mo() {}
    function yo(t, e, n) {
      if (!(25 > eo)) throw o(Error(301));
      var r = t.alternate;
      if (t === Ya || (null !== r && r === Ya))
        if (
          ((Ja = !0),
          (t = {
            expirationTime: $a,
            suspenseConfig: null,
            action: n,
            eagerReducer: null,
            eagerState: null,
            next: null,
          }),
          null === to && (to = new Map()),
          void 0 === (n = to.get(e)))
        )
          to.set(e, t);
        else {
          for (e = n; null !== e.next; ) e = e.next;
          e.next = t;
        }
      else {
        var i = Zl(),
          a = ya.suspense;
        a = {
          expirationTime: (i = Jl(i, t, a)),
          suspenseConfig: a,
          action: n,
          eagerReducer: null,
          eagerState: null,
          next: null,
        };
        var l = e.last;
        if (null === l) a.next = a;
        else {
          var u = l.next;
          null !== u && (a.next = u), (l.next = a);
        }
        if (
          ((e.last = a),
          0 === t.expirationTime &&
            (null === r || 0 === r.expirationTime) &&
            null !== (r = e.lastRenderedReducer))
        )
          try {
            var s = e.lastRenderedState,
              c = r(s, n);
            if (((a.eagerReducer = r), (a.eagerState = c), Xr(c, s))) return;
          } catch (t) {}
        nu(t, i);
      }
    }
    var vo = {
        readContext: ra,
        useCallback: no,
        useContext: no,
        useEffect: no,
        useImperativeHandle: no,
        useLayoutEffect: no,
        useMemo: no,
        useReducer: no,
        useRef: no,
        useState: no,
        useDebugValue: no,
        useResponder: no,
      },
      go = {
        readContext: ra,
        useCallback: function (t, e) {
          return (oo().memoizedState = [t, void 0 === e ? null : e]), t;
        },
        useContext: ra,
        useEffect: function (t, e) {
          return fo(516, 192, t, e);
        },
        useImperativeHandle: function (t, e, n) {
          return (
            (n = null != n ? n.concat([t]) : null),
            fo(4, 36, po.bind(null, e, t), n)
          );
        },
        useLayoutEffect: function (t, e) {
          return fo(4, 36, t, e);
        },
        useMemo: function (t, e) {
          var n = oo();
          return (
            (e = void 0 === e ? null : e),
            (t = t()),
            (n.memoizedState = [t, e]),
            t
          );
        },
        useReducer: function (t, e, n) {
          var r = oo();
          return (
            (e = void 0 !== n ? n(e) : e),
            (r.memoizedState = r.baseState = e),
            (t = (t = r.queue = {
              last: null,
              dispatch: null,
              lastRenderedReducer: t,
              lastRenderedState: e,
            }).dispatch = yo.bind(null, Ya, t)),
            [r.memoizedState, t]
          );
        },
        useRef: function (t) {
          return (t = { current: t }), (oo().memoizedState = t);
        },
        useState: function (t) {
          var e = oo();
          return (
            'function' == typeof t && (t = t()),
            (e.memoizedState = e.baseState = t),
            (t = (t = e.queue = {
              last: null,
              dispatch: null,
              lastRenderedReducer: uo,
              lastRenderedState: t,
            }).dispatch = yo.bind(null, Ya, t)),
            [e.memoizedState, t]
          );
        },
        useDebugValue: mo,
        useResponder: Ha,
      },
      _o = {
        readContext: ra,
        useCallback: function (t, e) {
          var n = lo();
          e = void 0 === e ? null : e;
          var r = n.memoizedState;
          return null !== r && null !== e && ro(e, r[1])
            ? r[0]
            : ((n.memoizedState = [t, e]), t);
        },
        useContext: ra,
        useEffect: function (t, e) {
          return ho(516, 192, t, e);
        },
        useImperativeHandle: function (t, e, n) {
          return (
            (n = null != n ? n.concat([t]) : null),
            ho(4, 36, po.bind(null, e, t), n)
          );
        },
        useLayoutEffect: function (t, e) {
          return ho(4, 36, t, e);
        },
        useMemo: function (t, e) {
          var n = lo();
          e = void 0 === e ? null : e;
          var r = n.memoizedState;
          return null !== r && null !== e && ro(e, r[1])
            ? r[0]
            : ((t = t()), (n.memoizedState = [t, e]), t);
        },
        useReducer: so,
        useRef: function () {
          return lo().memoizedState;
        },
        useState: function (t) {
          return so(uo);
        },
        useDebugValue: mo,
        useResponder: Ha,
      },
      bo = null,
      wo = null,
      xo = !1;
    function ko(t, e) {
      var n = Fu(5, null, null, 0);
      (n.elementType = 'DELETED'),
        (n.type = 'DELETED'),
        (n.stateNode = e),
        (n.return = t),
        (n.effectTag = 8),
        null !== t.lastEffect
          ? ((t.lastEffect.nextEffect = n), (t.lastEffect = n))
          : (t.firstEffect = t.lastEffect = n);
    }
    function Eo(t, e) {
      switch (t.tag) {
        case 5:
          var n = t.type;
          return (
            null !==
              (e =
                1 !== e.nodeType || n.toLowerCase() !== e.nodeName.toLowerCase()
                  ? null
                  : e) && ((t.stateNode = e), !0)
          );
        case 6:
          return (
            null !==
              (e = '' === t.pendingProps || 3 !== e.nodeType ? null : e) &&
            ((t.stateNode = e), !0)
          );
        case 13:
        default:
          return !1;
      }
    }
    function To(t) {
      if (xo) {
        var e = wo;
        if (e) {
          var n = e;
          if (!Eo(t, e)) {
            if (!(e = er(n.nextSibling)) || !Eo(t, e))
              return (
                (t.effectTag = (t.effectTag & ~_e) | ge),
                (xo = !1),
                void (bo = t)
              );
            ko(bo, n);
          }
          (bo = t), (wo = er(e.firstChild));
        } else (t.effectTag = (t.effectTag & ~_e) | ge), (xo = !1), (bo = t);
      }
    }
    function So(t) {
      for (
        t = t.return;
        null !== t && 5 !== t.tag && 3 !== t.tag && 13 !== t.tag;

      )
        t = t.return;
      bo = t;
    }
    function Co(t) {
      if (t !== bo) return !1;
      if (!xo) return So(t), (xo = !0), !1;
      var e = t.type;
      if (
        5 !== t.tag ||
        ('head' !== e && 'body' !== e && !Zn(e, t.memoizedProps))
      )
        for (e = wo; e; ) ko(t, e), (e = er(e.nextSibling));
      if ((So(t), 13 === t.tag)) {
        if (!(t = null !== (t = t.memoizedState) ? t.dehydrated : null))
          throw o(Error(317));
        t: {
          for (t = t.nextSibling, e = 0; t; ) {
            if (8 === t.nodeType) {
              var n = t.data;
              if (n === qn) {
                if (0 === e) {
                  t = er(t.nextSibling);
                  break t;
                }
                e--;
              } else (n !== Bn && n !== Xn && n !== Vn) || e++;
            }
            t = t.nextSibling;
          }
          t = null;
        }
      } else t = bo ? er(t.stateNode.nextSibling) : null;
      return (wo = t), !0;
    }
    function Mo() {
      (wo = bo = null), (xo = !1);
    }
    var No = L.ReactCurrentOwner,
      Po = !1;
    function Oo(t, e, n, r) {
      e.child = null === t ? Na(e, null, n, r) : Ma(e, t.child, n, r);
    }
    function Ao(t, e, n, r, i) {
      n = n.render;
      var a = e.ref;
      return (
        na(e, i),
        (r = io(t, e, n, r, a, i)),
        null === t || Po
          ? ((e.effectTag |= 1), Oo(t, e, r, i), e.child)
          : ((e.updateQueue = t.updateQueue),
            (e.effectTag &= -517),
            t.expirationTime <= i && (t.expirationTime = 0),
            Xo(t, e, i))
      );
    }
    function Lo(t, e, n, r, i, a) {
      if (null === t) {
        var o = n.type;
        return 'function' != typeof o ||
          zu(o) ||
          void 0 !== o.defaultProps ||
          null !== n.compare ||
          void 0 !== n.defaultProps
          ? (((t = ju(n.type, null, r, null, e.mode, a)).ref = e.ref),
            (t.return = e),
            (e.child = t))
          : ((e.tag = 15), (e.type = o), Ro(t, e, o, r, i, a));
      }
      return (
        (o = t.child),
        i < a &&
        ((i = o.memoizedProps),
        (n = null !== (n = n.compare) ? n : Kr)(i, r) && t.ref === e.ref)
          ? Xo(t, e, a)
          : ((e.effectTag |= 1),
            ((t = Iu(o, r)).ref = e.ref),
            (t.return = e),
            (e.child = t))
      );
    }
    function Ro(t, e, n, r, i, a) {
      return null !== t &&
        Kr(t.memoizedProps, r) &&
        t.ref === e.ref &&
        ((Po = !1), i < a)
        ? Xo(t, e, a)
        : zo(t, e, n, r, a);
    }
    function Fo(t, e) {
      var n = e.ref;
      ((null === t && null !== n) || (null !== t && t.ref !== n)) &&
        (e.effectTag |= 128);
    }
    function zo(t, e, n, r, i) {
      var a = di(n) ? hi : ci.current;
      return (
        (a = pi(e, a)),
        na(e, i),
        (n = io(t, e, n, r, a, i)),
        null === t || Po
          ? ((e.effectTag |= 1), Oo(t, e, n, i), e.child)
          : ((e.updateQueue = t.updateQueue),
            (e.effectTag &= -517),
            t.expirationTime <= i && (t.expirationTime = 0),
            Xo(t, e, i))
      );
    }
    function Io(t, e, n, r, i) {
      if (di(n)) {
        var a = !0;
        _i(e);
      } else a = !1;
      if ((na(e, i), null === e.stateNode))
        null !== t &&
          ((t.alternate = null), (e.alternate = null), (e.effectTag |= ge)),
          wa(e, n, r),
          ka(e, n, r, i),
          (r = !0);
      else if (null === t) {
        var o = e.stateNode,
          l = e.memoizedProps;
        o.props = l;
        var u = o.context,
          s = n.contextType;
        'object' == typeof s && null !== s
          ? (s = ra(s))
          : (s = pi(e, (s = di(n) ? hi : ci.current)));
        var c = n.getDerivedStateFromProps,
          f =
            'function' == typeof c ||
            'function' == typeof o.getSnapshotBeforeUpdate;
        f ||
          ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
            'function' != typeof o.componentWillReceiveProps) ||
          ((l !== r || u !== s) && xa(e, o, r, s)),
          (ia = !1);
        var h = e.memoizedState;
        u = o.state = h;
        var p = e.updateQueue;
        null !== p && (pa(e, p, r, o, i), (u = e.memoizedState)),
          l !== r || h !== u || fi.current || ia
            ? ('function' == typeof c &&
                (ga(e, n, c, r), (u = e.memoizedState)),
              (l = ia || ba(e, n, l, r, h, u, s))
                ? (f ||
                    ('function' != typeof o.UNSAFE_componentWillMount &&
                      'function' != typeof o.componentWillMount) ||
                    ('function' == typeof o.componentWillMount &&
                      o.componentWillMount(),
                    'function' == typeof o.UNSAFE_componentWillMount &&
                      o.UNSAFE_componentWillMount()),
                  'function' == typeof o.componentDidMount &&
                    (e.effectTag |= 4))
                : ('function' == typeof o.componentDidMount &&
                    (e.effectTag |= 4),
                  (e.memoizedProps = r),
                  (e.memoizedState = u)),
              (o.props = r),
              (o.state = u),
              (o.context = s),
              (r = l))
            : ('function' == typeof o.componentDidMount && (e.effectTag |= 4),
              (r = !1));
      } else
        (o = e.stateNode),
          (l = e.memoizedProps),
          (o.props = e.type === e.elementType ? l : Vi(e.type, l)),
          (u = o.context),
          'object' == typeof (s = n.contextType) && null !== s
            ? (s = ra(s))
            : (s = pi(e, (s = di(n) ? hi : ci.current))),
          (f =
            'function' == typeof (c = n.getDerivedStateFromProps) ||
            'function' == typeof o.getSnapshotBeforeUpdate) ||
            ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
              'function' != typeof o.componentWillReceiveProps) ||
            ((l !== r || u !== s) && xa(e, o, r, s)),
          (ia = !1),
          (u = e.memoizedState),
          (h = o.state = u),
          null !== (p = e.updateQueue) &&
            (pa(e, p, r, o, i), (h = e.memoizedState)),
          l !== r || u !== h || fi.current || ia
            ? ('function' == typeof c &&
                (ga(e, n, c, r), (h = e.memoizedState)),
              (c = ia || ba(e, n, l, r, u, h, s))
                ? (f ||
                    ('function' != typeof o.UNSAFE_componentWillUpdate &&
                      'function' != typeof o.componentWillUpdate) ||
                    ('function' == typeof o.componentWillUpdate &&
                      o.componentWillUpdate(r, h, s),
                    'function' == typeof o.UNSAFE_componentWillUpdate &&
                      o.UNSAFE_componentWillUpdate(r, h, s)),
                  'function' == typeof o.componentDidUpdate &&
                    (e.effectTag |= 4),
                  'function' == typeof o.getSnapshotBeforeUpdate &&
                    (e.effectTag |= 256))
                : ('function' != typeof o.componentDidUpdate ||
                    (l === t.memoizedProps && u === t.memoizedState) ||
                    (e.effectTag |= 4),
                  'function' != typeof o.getSnapshotBeforeUpdate ||
                    (l === t.memoizedProps && u === t.memoizedState) ||
                    (e.effectTag |= 256),
                  (e.memoizedProps = r),
                  (e.memoizedState = h)),
              (o.props = r),
              (o.state = h),
              (o.context = s),
              (r = c))
            : ('function' != typeof o.componentDidUpdate ||
                (l === t.memoizedProps && u === t.memoizedState) ||
                (e.effectTag |= 4),
              'function' != typeof o.getSnapshotBeforeUpdate ||
                (l === t.memoizedProps && u === t.memoizedState) ||
                (e.effectTag |= 256),
              (r = !1));
      return jo(t, e, n, r, a, i);
    }
    function jo(t, e, n, r, i, a) {
      Fo(t, e);
      var o = (64 & e.effectTag) !== ve;
      if (!r && !o) return i && bi(e, n, !1), Xo(t, e, a);
      (r = e.stateNode), (No.current = e);
      var l =
        o && 'function' != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (e.effectTag |= 1),
        null !== t && o
          ? ((e.child = Ma(e, t.child, null, a)), (e.child = Ma(e, null, l, a)))
          : Oo(t, e, l, a),
        (e.memoizedState = r.state),
        i && bi(e, n, !0),
        e.child
      );
    }
    function Uo(t) {
      var e = t.stateNode;
      e.pendingContext
        ? vi(0, e.pendingContext, e.pendingContext !== e.context)
        : e.context && vi(0, e.context, !1),
        Fa(t, e.containerInfo);
    }
    var Do,
      Ho,
      Wo,
      $o,
      Yo = { dehydrated: null, retryTime: 1 };
    function Bo(t, e, n) {
      var r,
        i = e.mode,
        a = e.pendingProps,
        o = Ua.current,
        l = !1;
      if (
        ((r = (64 & e.effectTag) !== ve) ||
          (r = 0 != (2 & o) && (null === t || null !== t.memoizedState)),
        r
          ? ((l = !0), (e.effectTag &= -65))
          : (null !== t && null === t.memoizedState) ||
            void 0 === a.fallback ||
            !0 === a.unstable_avoidThisFallback ||
            (o |= 1),
        ui(Ua, 1 & o),
        null === t)
      ) {
        if (l) {
          if (
            ((l = a.fallback),
            ((a = Uu(null, i, 0, null)).return = e),
            0 == (2 & e.mode))
          )
            for (
              t = null !== e.memoizedState ? e.child.child : e.child,
                a.child = t;
              null !== t;

            )
              (t.return = a), (t = t.sibling);
          return (
            ((n = Uu(l, i, n, null)).return = e),
            (a.sibling = n),
            (e.memoizedState = Yo),
            (e.child = a),
            n
          );
        }
        return (
          (i = a.children),
          (e.memoizedState = null),
          (e.child = Na(e, null, i, n))
        );
      }
      if (null !== t.memoizedState) {
        if (((i = (t = t.child).sibling), l)) {
          if (
            ((a = a.fallback),
            ((n = Iu(t, t.pendingProps)).return = e),
            0 == (2 & e.mode) &&
              (l = null !== e.memoizedState ? e.child.child : e.child) !==
                t.child)
          )
            for (n.child = l; null !== l; ) (l.return = n), (l = l.sibling);
          return (
            ((i = Iu(i, a, i.expirationTime)).return = e),
            (n.sibling = i),
            (n.childExpirationTime = 0),
            (e.memoizedState = Yo),
            (e.child = n),
            i
          );
        }
        return (
          (n = Ma(e, t.child, a.children, n)),
          (e.memoizedState = null),
          (e.child = n)
        );
      }
      if (((t = t.child), l)) {
        if (
          ((l = a.fallback),
          ((a = Uu(null, i, 0, null)).return = e),
          (a.child = t),
          null !== t && (t.return = a),
          0 == (2 & e.mode))
        )
          for (
            t = null !== e.memoizedState ? e.child.child : e.child, a.child = t;
            null !== t;

          )
            (t.return = a), (t = t.sibling);
        return (
          ((n = Uu(l, i, n, null)).return = e),
          (a.sibling = n),
          (n.effectTag |= ge),
          (a.childExpirationTime = 0),
          (e.memoizedState = Yo),
          (e.child = a),
          n
        );
      }
      return (e.memoizedState = null), (e.child = Ma(e, t, a.children, n));
    }
    function qo(t, e, n, r, i) {
      var a = t.memoizedState;
      null === a
        ? (t.memoizedState = {
            isBackwards: e,
            rendering: null,
            last: r,
            tail: n,
            tailExpiration: 0,
            tailMode: i,
          })
        : ((a.isBackwards = e),
          (a.rendering = null),
          (a.last = r),
          (a.tail = n),
          (a.tailExpiration = 0),
          (a.tailMode = i));
    }
    function Vo(t, e, n) {
      var r = e.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      if ((Oo(t, e, r.children, n), 0 != (2 & (r = Ua.current))))
        (r = (1 & r) | 2), (e.effectTag |= 64);
      else {
        if (null !== t && (64 & t.effectTag) !== ve)
          t: for (t = e.child; null !== t; ) {
            if (13 === t.tag) {
              if (null !== t.memoizedState) {
                t.expirationTime < n && (t.expirationTime = n);
                var o = t.alternate;
                null !== o && o.expirationTime < n && (o.expirationTime = n),
                  ea(t.return, n);
              }
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break t;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) break t;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
        r &= 1;
      }
      if ((ui(Ua, r), 0 == (2 & e.mode))) e.memoizedState = null;
      else
        switch (i) {
          case 'forwards':
            for (n = e.child, i = null; null !== n; )
              null !== (r = n.alternate) && null === Da(r) && (i = n),
                (n = n.sibling);
            null === (n = i)
              ? ((i = e.child), (e.child = null))
              : ((i = n.sibling), (n.sibling = null)),
              qo(e, !1, i, n, a);
            break;
          case 'backwards':
            for (n = null, i = e.child, e.child = null; null !== i; ) {
              if (null !== (r = i.alternate) && null === Da(r)) {
                e.child = i;
                break;
              }
              (r = i.sibling), (i.sibling = n), (n = i), (i = r);
            }
            qo(e, !0, n, null, a);
            break;
          case 'together':
            qo(e, !1, null, null, void 0);
            break;
          default:
            e.memoizedState = null;
        }
      return e.child;
    }
    function Xo(t, e, n) {
      null !== t && (e.dependencies = t.dependencies);
      var r = e.expirationTime;
      if ((0 !== r && vu(r), e.childExpirationTime < n)) return null;
      if (null !== t && e.child !== t.child) throw o(Error(153));
      if (null !== e.child) {
        for (
          n = Iu((t = e.child), t.pendingProps, t.expirationTime),
            e.child = n,
            n.return = e;
          null !== t.sibling;

        )
          (t = t.sibling),
            ((n = n.sibling = Iu(
              t,
              t.pendingProps,
              t.expirationTime
            )).return = e);
        n.sibling = null;
      }
      return e.child;
    }
    function Qo(t) {
      t.effectTag |= 4;
    }
    function Ko(t, e) {
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var n = null; null !== e; )
            null !== e.alternate && (n = e), (e = e.sibling);
          null === n ? (t.tail = null) : (n.sibling = null);
          break;
        case 'collapsed':
          n = t.tail;
          for (var r = null; null !== n; )
            null !== n.alternate && (r = n), (n = n.sibling);
          null === r
            ? e || null === t.tail
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (r.sibling = null);
      }
    }
    function Go(t) {
      switch (t.tag) {
        case 1:
          di(t.type) && mi();
          var e = t.effectTag;
          return 4096 & e ? ((t.effectTag = (-4097 & e) | 64), t) : null;
        case 3:
          if ((za(), yi(), (64 & (e = t.effectTag)) !== ve))
            throw o(Error(285));
          return (t.effectTag = (-4097 & e) | 64), t;
        case 5:
          return ja(t), null;
        case 13:
          return (
            li(Ua),
            4096 & (e = t.effectTag)
              ? ((t.effectTag = (-4097 & e) | 64), t)
              : null
          );
        case 19:
          return li(Ua), null;
        case 4:
          return za(), null;
        case 10:
          return ta(t), null;
        default:
          return null;
      }
    }
    function Zo(t, e) {
      return { value: t, source: e, stack: Z(e) };
    }
    (Do = function (t, e) {
      for (var n = e.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) t.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === e) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === e) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (Ho = function () {}),
      (Wo = function (t, e, n, r, a) {
        var o = t.memoizedProps;
        if (o !== r) {
          var l,
            u,
            s = e.stateNode;
          switch ((Ra(Oa.current), (t = null), n)) {
            case 'input':
              (o = St(s, o)), (r = St(s, r)), (t = []);
              break;
            case 'option':
              (o = At(s, o)), (r = At(s, r)), (t = []);
              break;
            case 'select':
              (o = i({}, o, { value: void 0 })),
                (r = i({}, r, { value: void 0 })),
                (t = []);
              break;
            case 'textarea':
              (o = Rt(s, o)), (r = Rt(s, r)), (t = []);
              break;
            default:
              'function' != typeof o.onClick &&
                'function' == typeof r.onClick &&
                (s.onclick = Un);
          }
          for (l in (zn(n, r), (n = null), o))
            if (!r.hasOwnProperty(l) && o.hasOwnProperty(l) && null != o[l])
              if ('style' === l)
                for (u in (s = o[l]))
                  s.hasOwnProperty(u) && (n || (n = {}), (n[u] = ''));
              else
                'dangerouslySetInnerHTML' !== l &&
                  'children' !== l &&
                  'suppressContentEditableWarning' !== l &&
                  'suppressHydrationWarning' !== l &&
                  'autoFocus' !== l &&
                  (p.hasOwnProperty(l)
                    ? t || (t = [])
                    : (t = t || []).push(l, null));
          for (l in r) {
            var c = r[l];
            if (
              ((s = null != o ? o[l] : void 0),
              r.hasOwnProperty(l) && c !== s && (null != c || null != s))
            )
              if ('style' === l)
                if (s) {
                  for (u in s)
                    !s.hasOwnProperty(u) ||
                      (c && c.hasOwnProperty(u)) ||
                      (n || (n = {}), (n[u] = ''));
                  for (u in c)
                    c.hasOwnProperty(u) &&
                      s[u] !== c[u] &&
                      (n || (n = {}), (n[u] = c[u]));
                } else n || (t || (t = []), t.push(l, n)), (n = c);
              else
                'dangerouslySetInnerHTML' === l
                  ? ((c = c ? c.__html : void 0),
                    (s = s ? s.__html : void 0),
                    null != c && s !== c && (t = t || []).push(l, '' + c))
                  : 'children' === l
                  ? s === c ||
                    ('string' != typeof c && 'number' != typeof c) ||
                    (t = t || []).push(l, '' + c)
                  : 'suppressContentEditableWarning' !== l &&
                    'suppressHydrationWarning' !== l &&
                    (p.hasOwnProperty(l)
                      ? (null != c && jn(a, l), t || s === c || (t = []))
                      : (t = t || []).push(l, c));
          }
          n && (t = t || []).push('style', n),
            (a = t),
            (e.updateQueue = a) && Qo(e);
        }
      }),
      ($o = function (t, e, n, r) {
        n !== r && Qo(e);
      });
    var Jo = 'function' == typeof WeakSet ? WeakSet : Set;
    function tl(t, e) {
      var n = e.source,
        r = e.stack;
      null === r && null !== n && (r = Z(n)),
        null !== n && G(n.type),
        (e = e.value),
        null !== t && 1 === t.tag && G(t.type);
      try {
        console.error(e);
      } catch (t) {
        setTimeout(function () {
          throw t;
        });
      }
    }
    function el(t) {
      var e = t.ref;
      if (null !== e)
        if ('function' == typeof e)
          try {
            e(null);
          } catch (e) {
            Nu(t, e);
          }
        else e.current = null;
    }
    function nl(t, e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          rl(2, 0, e);
          break;
        case 1:
          if (256 & e.effectTag && null !== t) {
            var n = t.memoizedProps,
              r = t.memoizedState;
            (e = (t = e.stateNode).getSnapshotBeforeUpdate(
              e.elementType === e.type ? n : Vi(e.type, n),
              r
            )),
              (t.__reactInternalSnapshotBeforeUpdate = e);
          }
          break;
        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw o(Error(163));
      }
    }
    function rl(t, e, n) {
      if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
        var r = (n = n.next);
        do {
          if (0 != (r.tag & t)) {
            var i = r.destroy;
            (r.destroy = void 0), void 0 !== i && i();
          }
          0 != (r.tag & e) && ((i = r.create), (r.destroy = i())), (r = r.next);
        } while (r !== n);
      }
    }
    function il(t, e, n) {
      switch (('function' == typeof Lu && Lu(e), e.tag)) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (null !== (t = e.updateQueue) && null !== (t = t.lastEffect)) {
            var r = t.next;
            Wi(97 < n ? 97 : n, function () {
              var t = r;
              do {
                var n = t.destroy;
                if (void 0 !== n) {
                  var i = e;
                  try {
                    n();
                  } catch (t) {
                    Nu(i, t);
                  }
                }
                t = t.next;
              } while (t !== r);
            });
          }
          break;
        case 1:
          el(e),
            'function' == typeof (n = e.stateNode).componentWillUnmount &&
              (function (t, e) {
                try {
                  (e.props = t.memoizedProps),
                    (e.state = t.memoizedState),
                    e.componentWillUnmount();
                } catch (e) {
                  Nu(t, e);
                }
              })(e, n);
          break;
        case 5:
          el(e);
          break;
        case 4:
          ul(t, e, n);
      }
    }
    function al(t) {
      var e = t.alternate;
      (t.return = null),
        (t.child = null),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.dependencies = null),
        (t.alternate = null),
        (t.firstEffect = null),
        (t.lastEffect = null),
        (t.pendingProps = null),
        (t.memoizedProps = null),
        null !== e && al(e);
    }
    function ol(t) {
      return 5 === t.tag || 3 === t.tag || 4 === t.tag;
    }
    function ll(t) {
      t: {
        for (var e = t.return; null !== e; ) {
          if (ol(e)) {
            var n = e;
            break t;
          }
          e = e.return;
        }
        throw o(Error(160));
      }
      switch (((e = n.stateNode), n.tag)) {
        case 5:
          var r = !1;
          break;
        case 3:
        case 4:
          (e = e.containerInfo), (r = !0);
          break;
        default:
          throw o(Error(161));
      }
      16 & n.effectTag && ($t(e, ''), (n.effectTag &= -17));
      t: e: for (n = t; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || ol(n.return)) {
            n = null;
            break t;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

        ) {
          if (n.effectTag & ge) continue e;
          if (null === n.child || 4 === n.tag) continue e;
          (n.child.return = n), (n = n.child);
        }
        if (!(n.effectTag & ge)) {
          n = n.stateNode;
          break t;
        }
      }
      for (var i = t; ; ) {
        var a = 5 === i.tag || 6 === i.tag;
        if (a) {
          var l = a ? i.stateNode : i.stateNode.instance;
          if (n)
            if (r) {
              var u = l;
              (l = n),
                8 === (a = e).nodeType
                  ? a.parentNode.insertBefore(u, l)
                  : a.insertBefore(u, l);
            } else e.insertBefore(l, n);
          else
            r
              ? (8 === (u = e).nodeType
                  ? (a = u.parentNode).insertBefore(l, u)
                  : (a = u).appendChild(l),
                null != (u = u._reactRootContainer) ||
                  null !== a.onclick ||
                  (a.onclick = Un))
              : e.appendChild(l);
        } else if (4 !== i.tag && null !== i.child) {
          (i.child.return = i), (i = i.child);
          continue;
        }
        if (i === t) break;
        for (; null === i.sibling; ) {
          if (null === i.return || i.return === t) return;
          i = i.return;
        }
        (i.sibling.return = i.return), (i = i.sibling);
      }
    }
    function ul(t, e, n) {
      for (var r, i, a = e, l = !1; ; ) {
        if (!l) {
          l = a.return;
          t: for (;;) {
            if (null === l) throw o(Error(160));
            switch (((r = l.stateNode), l.tag)) {
              case 5:
                i = !1;
                break t;
              case 3:
              case 4:
                (r = r.containerInfo), (i = !0);
                break t;
            }
            l = l.return;
          }
          l = !0;
        }
        if (5 === a.tag || 6 === a.tag) {
          t: for (var u = t, s = a, c = n, f = s; ; )
            if ((il(u, f, c), null !== f.child && 4 !== f.tag))
              (f.child.return = f), (f = f.child);
            else {
              if (f === s) break;
              for (; null === f.sibling; ) {
                if (null === f.return || f.return === s) break t;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
          i
            ? ((u = r),
              (s = a.stateNode),
              8 === u.nodeType ? u.parentNode.removeChild(s) : u.removeChild(s))
            : r.removeChild(a.stateNode);
        } else if (4 === a.tag) {
          if (null !== a.child) {
            (r = a.stateNode.containerInfo),
              (i = !0),
              (a.child.return = a),
              (a = a.child);
            continue;
          }
        } else if ((il(t, a, n), null !== a.child)) {
          (a.child.return = a), (a = a.child);
          continue;
        }
        if (a === e) break;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === e) return;
          4 === (a = a.return).tag && (l = !1);
        }
        (a.sibling.return = a.return), (a = a.sibling);
      }
    }
    function sl(t, e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          rl(4, 8, e);
          break;
        case 1:
          break;
        case 5:
          var n = e.stateNode;
          if (null != n) {
            var r = e.memoizedProps,
              i = null !== t ? t.memoizedProps : r;
            t = e.type;
            var a = e.updateQueue;
            if (((e.updateQueue = null), null !== a)) {
              for (
                n[ar] = r,
                  'input' === t &&
                    'radio' === r.type &&
                    null != r.name &&
                    Mt(n, r),
                  In(t, i),
                  e = In(t, r),
                  i = 0;
                i < a.length;
                i += 2
              ) {
                var l = a[i],
                  u = a[i + 1];
                'style' === l
                  ? Rn(n, u)
                  : 'dangerouslySetInnerHTML' === l
                  ? Wt(n, u)
                  : 'children' === l
                  ? $t(n, u)
                  : xt(n, l, u, e);
              }
              switch (t) {
                case 'input':
                  Nt(n, r);
                  break;
                case 'textarea':
                  zt(n, r);
                  break;
                case 'select':
                  (e = n._wrapperState.wasMultiple),
                    (n._wrapperState.wasMultiple = !!r.multiple),
                    null != (t = r.value)
                      ? Lt(n, !!r.multiple, t, !1)
                      : e !== !!r.multiple &&
                        (null != r.defaultValue
                          ? Lt(n, !!r.multiple, r.defaultValue, !0)
                          : Lt(n, !!r.multiple, r.multiple ? [] : '', !1));
              }
            }
          }
          break;
        case 6:
          if (null === e.stateNode) throw o(Error(162));
          e.stateNode.nodeValue = e.memoizedProps;
          break;
        case 3:
          (e = e.stateNode).hydrate && ((e.hydrate = !1), ye(e.containerInfo));
          break;
        case 12:
          break;
        case 13:
          if (
            ((n = e),
            null === e.memoizedState
              ? (r = !1)
              : ((r = !0), (n = e.child), (Ul = Ui())),
            null !== n)
          )
            t: for (t = n; ; ) {
              if (5 === t.tag)
                (a = t.stateNode),
                  r
                    ? 'function' == typeof (a = a.style).setProperty
                      ? a.setProperty('display', 'none', 'important')
                      : (a.display = 'none')
                    : ((a = t.stateNode),
                      (i =
                        null != (i = t.memoizedProps.style) &&
                        i.hasOwnProperty('display')
                          ? i.display
                          : null),
                      (a.style.display = Ln('display', i)));
              else if (6 === t.tag)
                t.stateNode.nodeValue = r ? '' : t.memoizedProps;
              else {
                if (
                  13 === t.tag &&
                  null !== t.memoizedState &&
                  null === t.memoizedState.dehydrated
                ) {
                  ((a = t.child.sibling).return = t), (t = a);
                  continue;
                }
                if (null !== t.child) {
                  (t.child.return = t), (t = t.child);
                  continue;
                }
              }
              if (t === n) break t;
              for (; null === t.sibling; ) {
                if (null === t.return || t.return === n) break t;
                t = t.return;
              }
              (t.sibling.return = t.return), (t = t.sibling);
            }
          cl(e);
          break;
        case 19:
          cl(e);
          break;
        case 17:
        case 20:
        case 21:
          break;
        default:
          throw o(Error(163));
      }
    }
    function cl(t) {
      var e = t.updateQueue;
      if (null !== e) {
        t.updateQueue = null;
        var n = t.stateNode;
        null === n && (n = t.stateNode = new Jo()),
          e.forEach(function (e) {
            var r = Ou.bind(null, t, e);
            n.has(e) || (n.add(e), e.then(r, r));
          });
      }
    }
    var fl = 'function' == typeof WeakMap ? WeakMap : Map;
    function hl(t, e, n) {
      ((n = la(n, null)).tag = 3), (n.payload = { element: null });
      var r = e.value;
      return (
        (n.callback = function () {
          Wl || ((Wl = !0), ($l = r)), tl(t, e);
        }),
        n
      );
    }
    function pl(t, e, n) {
      (n = la(n, null)).tag = 3;
      var r = t.type.getDerivedStateFromError;
      if ('function' == typeof r) {
        var i = e.value;
        n.payload = function () {
          return tl(t, e), r(i);
        };
      }
      var a = t.stateNode;
      return (
        null !== a &&
          'function' == typeof a.componentDidCatch &&
          (n.callback = function () {
            'function' != typeof r &&
              (null === Yl ? (Yl = new Set([this])) : Yl.add(this), tl(t, e));
            var n = e.stack;
            this.componentDidCatch(e.value, {
              componentStack: null !== n ? n : '',
            });
          }),
        n
      );
    }
    var dl = Math.ceil,
      ml = L.ReactCurrentDispatcher,
      yl = L.ReactCurrentOwner,
      vl = 0,
      gl = 8,
      _l = 16,
      bl = 32,
      wl = 0,
      xl = 1,
      kl = 2,
      El = 3,
      Tl = 4,
      Sl = 5,
      Cl = 6,
      Ml = vl,
      Nl = null,
      Pl = null,
      Ol = 0,
      Al = wl,
      Ll = null,
      Rl = 1073741823,
      Fl = 1073741823,
      zl = null,
      Il = 0,
      jl = !1,
      Ul = 0,
      Dl = 500,
      Hl = null,
      Wl = !1,
      $l = null,
      Yl = null,
      Bl = !1,
      ql = null,
      Vl = 90,
      Xl = null,
      Ql = 0,
      Kl = null,
      Gl = 0;
    function Zl() {
      return (Ml & (_l | bl)) !== vl
        ? 1073741821 - ((Ui() / 10) | 0)
        : 0 !== Gl
        ? Gl
        : (Gl = 1073741821 - ((Ui() / 10) | 0));
    }
    function Jl(t, e, n) {
      if (0 == (2 & (e = e.mode))) return 1073741823;
      var r = Di();
      if (0 == (4 & e)) return 99 === r ? 1073741823 : 1073741822;
      if ((Ml & _l) !== vl) return Ol;
      if (null !== n)
        t =
          1073741821 -
          25 *
            (1 + (((1073741821 - t + (0 | n.timeoutMs || 5e3) / 10) / 25) | 0));
      else
        switch (r) {
          case 99:
            t = 1073741823;
            break;
          case 98:
            t = 1073741821 - 10 * (1 + (((1073741821 - t + 15) / 10) | 0));
            break;
          case 97:
          case 96:
            t = 1073741821 - 25 * (1 + (((1073741821 - t + 500) / 25) | 0));
            break;
          case 95:
            t = 2;
            break;
          default:
            throw o(Error(326));
        }
      return null !== Nl && t === Ol && --t, t;
    }
    var tu,
      eu = 0;
    function nu(t, e) {
      if (50 < Ql) throw ((Ql = 0), (Kl = null), o(Error(185)));
      if (null !== (t = ru(t, e))) {
        var n = Di();
        1073741823 === e
          ? (Ml & gl) !== vl && (Ml & (_l | bl)) === vl
            ? lu(t)
            : (au(t), Ml === vl && Bi())
          : au(t),
          (4 & Ml) === vl ||
            (98 !== n && 99 !== n) ||
            (null === Xl
              ? (Xl = new Map([[t, e]]))
              : (void 0 === (n = Xl.get(t)) || n > e) && Xl.set(t, e));
      }
    }
    function ru(t, e) {
      t.expirationTime < e && (t.expirationTime = e);
      var n = t.alternate;
      null !== n && n.expirationTime < e && (n.expirationTime = e);
      var r = t.return,
        i = null;
      if (null === r && 3 === t.tag) i = t.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            r.childExpirationTime < e && (r.childExpirationTime = e),
            null !== n &&
              n.childExpirationTime < e &&
              (n.childExpirationTime = e),
            null === r.return && 3 === r.tag)
          ) {
            i = r.stateNode;
            break;
          }
          r = r.return;
        }
      return (
        null !== i && (Nl === i && (vu(e), Al === Tl && Yu(i, Ol)), Bu(i, e)), i
      );
    }
    function iu(t) {
      var e = t.lastExpiredTime;
      return 0 !== e
        ? e
        : $u(t, (e = t.firstPendingTime))
        ? (e = t.lastPingedTime) > (t = t.nextKnownPendingLevel)
          ? e
          : t
        : e;
    }
    function au(t) {
      if (0 !== t.lastExpiredTime)
        (t.callbackExpirationTime = 1073741823),
          (t.callbackPriority = 99),
          (t.callbackNode = Yi(lu.bind(null, t)));
      else {
        var e = iu(t),
          n = t.callbackNode;
        if (0 === e)
          null !== n &&
            ((t.callbackNode = null),
            (t.callbackExpirationTime = 0),
            (t.callbackPriority = 90));
        else {
          var r = Zl();
          if (
            (1073741823 === e
              ? (r = 99)
              : 1 === e || 2 === e
              ? (r = 95)
              : (r =
                  0 >= (r = 10 * (1073741821 - e) - 10 * (1073741821 - r))
                    ? 99
                    : 250 >= r
                    ? 98
                    : 5250 >= r
                    ? 97
                    : 95),
            null !== n)
          ) {
            var i = t.callbackPriority;
            if (t.callbackExpirationTime === e && i >= r) return;
            n !== Li && ki(n);
          }
          (t.callbackExpirationTime = e),
            (t.callbackPriority = r),
            (e =
              1073741823 === e
                ? Yi(lu.bind(null, t))
                : $i(r, ou.bind(null, t), {
                    timeout: 10 * (1073741821 - e) - Ui(),
                  })),
            (t.callbackNode = e);
        }
      }
    }
    function ou(t, e) {
      if (((Gl = 0), e)) return qu(t, (e = Zl())), au(t), null;
      var n = iu(t);
      if (0 !== n) {
        if (((e = t.callbackNode), (Ml & (_l | bl)) !== vl))
          throw o(Error(327));
        if ((Su(), (t === Nl && n === Ol) || pu(t, n), null !== Pl)) {
          var r = Ml;
          Ml |= _l;
          for (var i = mu(); ; )
            try {
              _u();
              break;
            } catch (e) {
              du(t, e);
            }
          if ((Zi(), (Ml = r), (ml.current = i), Al === xl))
            throw ((e = Ll), pu(t, n), Yu(t, n), au(t), e);
          if (null === Pl)
            switch (
              ((i = t.finishedWork = t.current.alternate),
              (t.finishedExpirationTime = n),
              su(t, n),
              (r = Al),
              (Nl = null),
              r)
            ) {
              case wl:
              case xl:
                throw o(Error(345));
              case kl:
                if (2 !== n) {
                  qu(t, 2);
                  break;
                }
                ku(t);
                break;
              case El:
                if (
                  (Yu(t, n),
                  n === (r = t.lastSuspendedTime) &&
                    (t.nextKnownPendingLevel = xu(i)),
                  1073741823 === Rl && 10 < (i = Ul + Dl - Ui()))
                ) {
                  if (jl) {
                    var a = t.lastPingedTime;
                    if (0 === a || a >= n) {
                      (t.lastPingedTime = n), pu(t, n);
                      break;
                    }
                  }
                  if (0 !== (a = iu(t)) && a !== n) break;
                  if (0 !== r && r !== n) {
                    t.lastPingedTime = r;
                    break;
                  }
                  t.timeoutHandle = Jn(ku.bind(null, t), i);
                  break;
                }
                ku(t);
                break;
              case Tl:
                if (
                  (Yu(t, n),
                  n === (r = t.lastSuspendedTime) &&
                    (t.nextKnownPendingLevel = xu(i)),
                  jl && (0 === (i = t.lastPingedTime) || i >= n))
                ) {
                  (t.lastPingedTime = n), pu(t, n);
                  break;
                }
                if (0 !== (i = iu(t)) && i !== n) break;
                if (0 !== r && r !== n) {
                  t.lastPingedTime = r;
                  break;
                }
                if (
                  (1073741823 !== Fl
                    ? (r = 10 * (1073741821 - Fl) - Ui())
                    : 1073741823 === Rl
                    ? (r = 0)
                    : ((r = 10 * (1073741821 - Rl) - 5e3),
                      0 > (r = (i = Ui()) - r) && (r = 0),
                      (n = 10 * (1073741821 - n) - i) <
                        (r =
                          (120 > r
                            ? 120
                            : 480 > r
                            ? 480
                            : 1080 > r
                            ? 1080
                            : 1920 > r
                            ? 1920
                            : 3e3 > r
                            ? 3e3
                            : 4320 > r
                            ? 4320
                            : 1960 * dl(r / 1960)) - r) && (r = n)),
                  10 < r)
                ) {
                  t.timeoutHandle = Jn(ku.bind(null, t), r);
                  break;
                }
                ku(t);
                break;
              case Sl:
                if (1073741823 !== Rl && null !== zl) {
                  a = Rl;
                  var l = zl;
                  if (
                    (0 >= (r = 0 | l.busyMinDurationMs)
                      ? (r = 0)
                      : ((i = 0 | l.busyDelayMs),
                        (r =
                          (a =
                            Ui() -
                            (10 * (1073741821 - a) -
                              (0 | l.timeoutMs || 5e3))) <= i
                            ? 0
                            : i + r - a)),
                    10 < r)
                  ) {
                    Yu(t, n), (t.timeoutHandle = Jn(ku.bind(null, t), r));
                    break;
                  }
                }
                ku(t);
                break;
              case Cl:
                Yu(t, n);
                break;
              default:
                throw o(Error(329));
            }
          if ((au(t), t.callbackNode === e)) return ou.bind(null, t);
        }
      }
      return null;
    }
    function lu(t) {
      var e = t.lastExpiredTime;
      if (((e = 0 !== e ? e : 1073741823), t.finishedExpirationTime === e))
        ku(t);
      else {
        if ((Ml & (_l | bl)) !== vl) throw o(Error(327));
        if ((Su(), (t === Nl && e === Ol) || pu(t, e), null !== Pl)) {
          var n = Ml;
          Ml |= _l;
          for (var r = mu(); ; )
            try {
              gu();
              break;
            } catch (e) {
              du(t, e);
            }
          if ((Zi(), (Ml = n), (ml.current = r), Al === xl))
            throw ((n = Ll), pu(t, e), Yu(t, e), au(t), n);
          if (null !== Pl) throw o(Error(261));
          (t.finishedWork = t.current.alternate),
            (t.finishedExpirationTime = e),
            su(t, e),
            Al === Cl ? Yu(t, e) : ((Nl = null), ku(t)),
            au(t);
        }
      }
      return null;
    }
    function uu() {
      (Ml & (1 | _l | bl)) === vl &&
        ((function () {
          if (null !== Xl) {
            var t = Xl;
            (Xl = null),
              t.forEach(function (t, e) {
                qu(e, t), au(e);
              }),
              Bi();
          }
        })(),
        Su());
    }
    function su(t, e) {
      var n = t.firstBatch;
      null !== n &&
        n._defer &&
        n._expirationTime >= e &&
        ($i(97, function () {
          return n._onComplete(), null;
        }),
        (Al = Cl));
    }
    function cu(t, e) {
      var n = Ml;
      Ml |= 1;
      try {
        return t(e);
      } finally {
        (Ml = n) === vl && Bi();
      }
    }
    function fu(t, e, n, r) {
      var i = Ml;
      Ml |= 4;
      try {
        return Wi(98, t.bind(null, e, n, r));
      } finally {
        (Ml = i) === vl && Bi();
      }
    }
    function hu(t, e) {
      var n = Ml;
      (Ml &= -2), (Ml |= gl);
      try {
        return t(e);
      } finally {
        (Ml = n) === vl && Bi();
      }
    }
    function pu(t, e) {
      (t.finishedWork = null), (t.finishedExpirationTime = 0);
      var n = t.timeoutHandle;
      if ((-1 !== n && ((t.timeoutHandle = -1), tr(n)), null !== Pl))
        for (n = Pl.return; null !== n; ) {
          var r = n;
          switch (r.tag) {
            case 1:
              var i = r.type.childContextTypes;
              null != i && mi();
              break;
            case 3:
              za(), yi();
              break;
            case 5:
              ja(r);
              break;
            case 4:
              za();
              break;
            case 13:
            case 19:
              li(Ua);
              break;
            case 10:
              ta(r);
          }
          n = n.return;
        }
      (Nl = t),
        (Pl = Iu(t.current, null)),
        (Ol = e),
        (Al = wl),
        (Ll = null),
        (Fl = Rl = 1073741823),
        (zl = null),
        (Il = 0),
        (jl = !1);
    }
    function du(t, e) {
      for (;;) {
        try {
          if ((Zi(), ao(), null === Pl || null === Pl.return))
            return (Al = xl), (Ll = e), null;
          t: {
            var n = t,
              r = Pl.return,
              i = Pl,
              a = e;
            if (
              ((e = Ol),
              (i.effectTag |= 2048),
              (i.firstEffect = i.lastEffect = null),
              null !== a && 'object' == typeof a && 'function' == typeof a.then)
            ) {
              var o = a,
                l = 0 != (1 & Ua.current),
                u = r;
              do {
                var s;
                if ((s = 13 === u.tag)) {
                  var c = u.memoizedState;
                  if (null !== c) s = null !== c.dehydrated;
                  else {
                    var f = u.memoizedProps;
                    s =
                      void 0 !== f.fallback &&
                      (!0 !== f.unstable_avoidThisFallback || !l);
                  }
                }
                if (s) {
                  var h = u.updateQueue;
                  if (null === h) {
                    var p = new Set();
                    p.add(o), (u.updateQueue = p);
                  } else h.add(o);
                  if (0 == (2 & u.mode)) {
                    if (
                      ((u.effectTag |= 64), (i.effectTag &= -2981), 1 === i.tag)
                    )
                      if (null === i.alternate) i.tag = 17;
                      else {
                        var d = la(1073741823, null);
                        (d.tag = 2), sa(i, d);
                      }
                    i.expirationTime = 1073741823;
                    break t;
                  }
                  (a = void 0), (i = e);
                  var m = n.pingCache;
                  if (
                    (null === m
                      ? ((m = n.pingCache = new fl()),
                        (a = new Set()),
                        m.set(o, a))
                      : void 0 === (a = m.get(o)) &&
                        ((a = new Set()), m.set(o, a)),
                    !a.has(i))
                  ) {
                    a.add(i);
                    var y = Pu.bind(null, n, o, i);
                    o.then(y, y);
                  }
                  (u.effectTag |= 4096), (u.expirationTime = e);
                  break t;
                }
                u = u.return;
              } while (null !== u);
              a = Error(
                (G(i.type) || 'A React component') +
                  ' suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.' +
                  Z(i)
              );
            }
            Al !== Sl && (Al = kl), (a = Zo(a, i)), (u = r);
            do {
              switch (u.tag) {
                case 3:
                  (o = a),
                    (u.effectTag |= 4096),
                    (u.expirationTime = e),
                    ca(u, hl(u, o, e));
                  break t;
                case 1:
                  o = a;
                  var v = u.type,
                    g = u.stateNode;
                  if (
                    (64 & u.effectTag) === ve &&
                    ('function' == typeof v.getDerivedStateFromError ||
                      (null !== g &&
                        'function' == typeof g.componentDidCatch &&
                        (null === Yl || !Yl.has(g))))
                  ) {
                    (u.effectTag |= 4096),
                      (u.expirationTime = e),
                      ca(u, pl(u, o, e));
                    break t;
                  }
              }
              u = u.return;
            } while (null !== u);
          }
          Pl = wu(Pl);
        } catch (t) {
          e = t;
          continue;
        }
        break;
      }
    }
    function mu() {
      var t = ml.current;
      return (ml.current = vo), null === t ? vo : t;
    }
    function yu(t, e) {
      t < Rl && 2 < t && (Rl = t),
        null !== e && t < Fl && 2 < t && ((Fl = t), (zl = e));
    }
    function vu(t) {
      t > Il && (Il = t);
    }
    function gu() {
      for (; null !== Pl; ) Pl = bu(Pl);
    }
    function _u() {
      for (; null !== Pl && !Ei(); ) Pl = bu(Pl);
    }
    function bu(t) {
      var e = tu(t.alternate, t, Ol);
      return (
        (t.memoizedProps = t.pendingProps),
        null === e && (e = wu(t)),
        (yl.current = null),
        e
      );
    }
    function wu(t) {
      Pl = t;
      do {
        var e = Pl.alternate;
        if (((t = Pl.return), (2048 & Pl.effectTag) === ve)) {
          t: {
            var n = e,
              r = Ol,
              a = (e = Pl).pendingProps;
            switch (e.tag) {
              case 2:
              case 16:
                break;
              case 15:
              case 0:
                break;
              case 1:
                di(e.type) && mi();
                break;
              case 3:
                za(),
                  yi(),
                  (r = e.stateNode).pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                  (null === n || null === n.child) && Co(e) && Qo(e),
                  Ho(e);
                break;
              case 5:
                ja(e), (r = Ra(La.current));
                var l = e.type;
                if (null !== n && null != e.stateNode)
                  Wo(n, e, l, a, r), n.ref !== e.ref && (e.effectTag |= 128);
                else if (a) {
                  var u = Ra(Oa.current);
                  if (Co(e)) {
                    (l = void 0), (n = (a = e).stateNode);
                    var s = a.type,
                      c = a.memoizedProps;
                    switch (((n[ir] = a), (n[ar] = c), s)) {
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        bn('load', n);
                        break;
                      case 'video':
                      case 'audio':
                        for (var f = 0; f < Jt.length; f++) bn(Jt[f], n);
                        break;
                      case 'source':
                        bn('error', n);
                        break;
                      case 'img':
                      case 'image':
                      case 'link':
                        bn('error', n), bn('load', n);
                        break;
                      case 'form':
                        bn('reset', n), bn('submit', n);
                        break;
                      case 'details':
                        bn('toggle', n);
                        break;
                      case 'input':
                        Ct(n, c), bn('invalid', n), jn(r, 'onChange');
                        break;
                      case 'select':
                        (n._wrapperState = { wasMultiple: !!c.multiple }),
                          bn('invalid', n),
                          jn(r, 'onChange');
                        break;
                      case 'textarea':
                        Ft(n, c), bn('invalid', n), jn(r, 'onChange');
                    }
                    for (l in (zn(s, c), (f = null), c))
                      c.hasOwnProperty(l) &&
                        ((u = c[l]),
                        'children' === l
                          ? 'string' == typeof u
                            ? n.textContent !== u && (f = ['children', u])
                            : 'number' == typeof u &&
                              n.textContent !== '' + u &&
                              (f = ['children', '' + u])
                          : p.hasOwnProperty(l) && null != u && jn(r, l));
                    switch (s) {
                      case 'input':
                        Et(n), Pt(n, c, !0);
                        break;
                      case 'textarea':
                        Et(n), It(n);
                        break;
                      case 'select':
                      case 'option':
                        break;
                      default:
                        'function' == typeof c.onClick && (n.onclick = Un);
                    }
                    (r = f), (a.updateQueue = r), null !== r && Qo(e);
                  } else {
                    (c = l),
                      (n = a),
                      (s = e),
                      (f = 9 === r.nodeType ? r : r.ownerDocument),
                      u === jt.html && (u = Ut(c)),
                      u === jt.html
                        ? 'script' === c
                          ? (((c = f.createElement('div')).innerHTML =
                              '<script></script>'),
                            (f = c.removeChild(c.firstChild)))
                          : 'string' == typeof n.is
                          ? (f = f.createElement(c, { is: n.is }))
                          : ((f = f.createElement(c)),
                            'select' === c &&
                              ((c = f),
                              n.multiple
                                ? (c.multiple = !0)
                                : n.size && (c.size = n.size)))
                        : (f = f.createElementNS(u, c)),
                      ((c = f)[ir] = s),
                      (c[ar] = n),
                      Do((n = c), e, !1, !1),
                      (e.stateNode = n),
                      (u = r);
                    var h = In(l, a);
                    switch (l) {
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        bn('load', n), (r = a);
                        break;
                      case 'video':
                      case 'audio':
                        for (r = 0; r < Jt.length; r++) bn(Jt[r], n);
                        r = a;
                        break;
                      case 'source':
                        bn('error', n), (r = a);
                        break;
                      case 'img':
                      case 'image':
                      case 'link':
                        bn('error', n), bn('load', n), (r = a);
                        break;
                      case 'form':
                        bn('reset', n), bn('submit', n), (r = a);
                        break;
                      case 'details':
                        bn('toggle', n), (r = a);
                        break;
                      case 'input':
                        Ct(n, a),
                          (r = St(n, a)),
                          bn('invalid', n),
                          jn(u, 'onChange');
                        break;
                      case 'option':
                        r = At(n, a);
                        break;
                      case 'select':
                        (n._wrapperState = { wasMultiple: !!a.multiple }),
                          (r = i({}, a, { value: void 0 })),
                          bn('invalid', n),
                          jn(u, 'onChange');
                        break;
                      case 'textarea':
                        Ft(n, a),
                          (r = Rt(n, a)),
                          bn('invalid', n),
                          jn(u, 'onChange');
                        break;
                      default:
                        r = a;
                    }
                    zn(l, r), (s = void 0), (c = l), (f = n);
                    var d = r;
                    for (s in d)
                      if (d.hasOwnProperty(s)) {
                        var m = d[s];
                        'style' === s
                          ? Rn(f, m)
                          : 'dangerouslySetInnerHTML' === s
                          ? null != (m = m ? m.__html : void 0) && Wt(f, m)
                          : 'children' === s
                          ? 'string' == typeof m
                            ? ('textarea' !== c || '' !== m) && $t(f, m)
                            : 'number' == typeof m && $t(f, '' + m)
                          : 'suppressContentEditableWarning' !== s &&
                            'suppressHydrationWarning' !== s &&
                            'autoFocus' !== s &&
                            (p.hasOwnProperty(s)
                              ? null != m && jn(u, s)
                              : null != m && xt(f, s, m, h));
                      }
                    switch (l) {
                      case 'input':
                        Et(n), Pt(n, a, !1);
                        break;
                      case 'textarea':
                        Et(n), It(n);
                        break;
                      case 'option':
                        null != a.value &&
                          n.setAttribute('value', '' + wt(a.value));
                        break;
                      case 'select':
                        (r = n),
                          (n = a),
                          (r.multiple = !!n.multiple),
                          null != (s = n.value)
                            ? Lt(r, !!n.multiple, s, !1)
                            : null != n.defaultValue &&
                              Lt(r, !!n.multiple, n.defaultValue, !0);
                        break;
                      default:
                        'function' == typeof r.onClick && (n.onclick = Un);
                    }
                    Gn(l, a) && Qo(e);
                  }
                  null !== e.ref && (e.effectTag |= 128);
                } else if (null === e.stateNode) throw o(Error(166));
                break;
              case 6:
                if (n && null != e.stateNode) $o(n, e, n.memoizedProps, a);
                else {
                  if ('string' != typeof a && null === e.stateNode)
                    throw o(Error(166));
                  (l = Ra(La.current)),
                    Ra(Oa.current),
                    Co(e)
                      ? ((r = e.stateNode),
                        (a = e.memoizedProps),
                        (r[ir] = e),
                        r.nodeValue !== a && Qo(e))
                      : ((r = e),
                        ((a = (9 === l.nodeType
                          ? l
                          : l.ownerDocument
                        ).createTextNode(a))[ir] = e),
                        (r.stateNode = a));
                }
                break;
              case 11:
                break;
              case 13:
                if (
                  (li(Ua), (a = e.memoizedState), (64 & e.effectTag) !== ve)
                ) {
                  e.expirationTime = r;
                  break t;
                }
                (r = null !== a),
                  (a = !1),
                  null === n
                    ? Co(e)
                    : ((a = null !== (l = n.memoizedState)),
                      r ||
                        null === l ||
                        (null !== (l = n.child.sibling) &&
                          (null !== (s = e.firstEffect)
                            ? ((e.firstEffect = l), (l.nextEffect = s))
                            : ((e.firstEffect = e.lastEffect = l),
                              (l.nextEffect = null)),
                          (l.effectTag = 8)))),
                  r &&
                    !a &&
                    0 != (2 & e.mode) &&
                    ((null === n &&
                      !0 !== e.memoizedProps.unstable_avoidThisFallback) ||
                    0 != (1 & Ua.current)
                      ? Al === wl && (Al = El)
                      : ((Al !== wl && Al !== El) || (Al = Tl),
                        0 !== Il && null !== Nl && (Yu(Nl, Ol), Bu(Nl, Il)))),
                  (r || a) && (e.effectTag |= 4);
                break;
              case 7:
              case 8:
              case 12:
                break;
              case 4:
                za(), Ho(e);
                break;
              case 10:
                ta(e);
                break;
              case 9:
              case 14:
                break;
              case 17:
                di(e.type) && mi();
                break;
              case 19:
                if ((li(Ua), null === (a = e.memoizedState))) break;
                if (
                  ((l = (64 & e.effectTag) !== ve), null === (s = a.rendering))
                ) {
                  if (l) Ko(a, !1);
                  else if (
                    Al !== wl ||
                    (null !== n && (64 & n.effectTag) !== ve)
                  )
                    for (n = e.child; null !== n; ) {
                      if (null !== (s = Da(n))) {
                        for (
                          e.effectTag |= 64,
                            Ko(a, !1),
                            null !== (a = s.updateQueue) &&
                              ((e.updateQueue = a), (e.effectTag |= 4)),
                            e.firstEffect = e.lastEffect = null,
                            a = e.child;
                          null !== a;

                        )
                          (n = r),
                            ((l = a).effectTag &= ge),
                            (l.nextEffect = null),
                            (l.firstEffect = null),
                            (l.lastEffect = null),
                            null === (s = l.alternate)
                              ? ((l.childExpirationTime = 0),
                                (l.expirationTime = n),
                                (l.child = null),
                                (l.memoizedProps = null),
                                (l.memoizedState = null),
                                (l.updateQueue = null),
                                (l.dependencies = null))
                              : ((l.childExpirationTime =
                                  s.childExpirationTime),
                                (l.expirationTime = s.expirationTime),
                                (l.child = s.child),
                                (l.memoizedProps = s.memoizedProps),
                                (l.memoizedState = s.memoizedState),
                                (l.updateQueue = s.updateQueue),
                                (n = s.dependencies),
                                (l.dependencies =
                                  null === n
                                    ? null
                                    : {
                                        expirationTime: n.expirationTime,
                                        firstContext: n.firstContext,
                                        responders: n.responders,
                                      })),
                            (a = a.sibling);
                        ui(Ua, (1 & Ua.current) | 2), (e = e.child);
                        break t;
                      }
                      n = n.sibling;
                    }
                } else {
                  if (!l)
                    if (null !== (n = Da(s))) {
                      if (
                        ((e.effectTag |= 64),
                        (l = !0),
                        Ko(a, !0),
                        null === a.tail && 'hidden' === a.tailMode)
                      ) {
                        null !== (r = n.updateQueue) &&
                          ((e.updateQueue = r), (e.effectTag |= 4)),
                          null !== (e = e.lastEffect = a.lastEffect) &&
                            (e.nextEffect = null);
                        break;
                      }
                    } else
                      Ui() > a.tailExpiration &&
                        1 < r &&
                        ((e.effectTag |= 64),
                        (l = !0),
                        Ko(a, !1),
                        (e.expirationTime = e.childExpirationTime = r - 1));
                  a.isBackwards
                    ? ((s.sibling = e.child), (e.child = s))
                    : (null !== (r = a.last) ? (r.sibling = s) : (e.child = s),
                      (a.last = s));
                }
                if (null !== a.tail) {
                  0 === a.tailExpiration && (a.tailExpiration = Ui() + 500),
                    (r = a.tail),
                    (a.rendering = r),
                    (a.tail = r.sibling),
                    (a.lastEffect = e.lastEffect),
                    (r.sibling = null),
                    (a = Ua.current),
                    ui(Ua, (a = l ? (1 & a) | 2 : 1 & a)),
                    (e = r);
                  break t;
                }
                break;
              case 20:
              case 21:
                break;
              default:
                throw o(Error(156), e.tag);
            }
            e = null;
          }
          if (((r = Pl), 1 === Ol || 1 !== r.childExpirationTime)) {
            for (a = 0, l = r.child; null !== l; )
              (n = l.expirationTime) > a && (a = n),
                (s = l.childExpirationTime) > a && (a = s),
                (l = l.sibling);
            r.childExpirationTime = a;
          }
          if (null !== e) return e;
          null !== t &&
            (2048 & t.effectTag) === ve &&
            (null === t.firstEffect && (t.firstEffect = Pl.firstEffect),
            null !== Pl.lastEffect &&
              (null !== t.lastEffect &&
                (t.lastEffect.nextEffect = Pl.firstEffect),
              (t.lastEffect = Pl.lastEffect)),
            1 < Pl.effectTag &&
              (null !== t.lastEffect
                ? (t.lastEffect.nextEffect = Pl)
                : (t.firstEffect = Pl),
              (t.lastEffect = Pl)));
        } else {
          if (null !== (e = Go(Pl))) return (e.effectTag &= 2047), e;
          null !== t &&
            ((t.firstEffect = t.lastEffect = null), (t.effectTag |= 2048));
        }
        if (null !== (e = Pl.sibling)) return e;
        Pl = t;
      } while (null !== Pl);
      return Al === wl && (Al = Sl), null;
    }
    function xu(t) {
      var e = t.expirationTime;
      return e > (t = t.childExpirationTime) ? e : t;
    }
    function ku(t) {
      var e = Di();
      return Wi(99, Eu.bind(null, t, e)), null;
    }
    function Eu(t, e) {
      if ((Su(), (Ml & (_l | bl)) !== vl)) throw o(Error(327));
      var n = t.finishedWork,
        r = t.finishedExpirationTime;
      if (null === n) return null;
      if (
        ((t.finishedWork = null),
        (t.finishedExpirationTime = 0),
        n === t.current)
      )
        throw o(Error(177));
      (t.callbackNode = null),
        (t.callbackExpirationTime = 0),
        (t.callbackPriority = 90),
        (t.nextKnownPendingLevel = 0);
      var i = xu(n);
      if (
        ((t.firstPendingTime = i),
        r <= t.lastSuspendedTime
          ? (t.firstSuspendedTime = t.lastSuspendedTime = t.nextKnownPendingLevel = 0)
          : r <= t.firstSuspendedTime && (t.firstSuspendedTime = r - 1),
        r <= t.lastPingedTime && (t.lastPingedTime = 0),
        r <= t.lastExpiredTime && (t.lastExpiredTime = 0),
        t === Nl && ((Pl = Nl = null), (Ol = 0)),
        1 < n.effectTag
          ? null !== n.lastEffect
            ? ((n.lastEffect.nextEffect = n), (i = n.firstEffect))
            : (i = n)
          : (i = n.firstEffect),
        null !== i)
      ) {
        var a = Ml;
        (Ml |= bl), (yl.current = null), (Qn = _n);
        var l = $n();
        if (Yn(l)) {
          if ('selectionStart' in l)
            var u = { start: l.selectionStart, end: l.selectionEnd };
          else
            t: {
              var s =
                (u = ((u = l.ownerDocument) && u.defaultView) || window)
                  .getSelection && u.getSelection();
              if (s && 0 !== s.rangeCount) {
                u = s.anchorNode;
                var c = s.anchorOffset,
                  f = s.focusNode;
                s = s.focusOffset;
                try {
                  u.nodeType, f.nodeType;
                } catch (t) {
                  u = null;
                  break t;
                }
                var h = 0,
                  p = -1,
                  d = -1,
                  m = 0,
                  y = 0,
                  v = l,
                  g = null;
                e: for (;;) {
                  for (
                    var _;
                    v !== u || (0 !== c && 3 !== v.nodeType) || (p = h + c),
                      v !== f || (0 !== s && 3 !== v.nodeType) || (d = h + s),
                      3 === v.nodeType && (h += v.nodeValue.length),
                      null !== (_ = v.firstChild);

                  )
                    (g = v), (v = _);
                  for (;;) {
                    if (v === l) break e;
                    if (
                      (g === u && ++m === c && (p = h),
                      g === f && ++y === s && (d = h),
                      null !== (_ = v.nextSibling))
                    )
                      break;
                    g = (v = g).parentNode;
                  }
                  v = _;
                }
                u = -1 === p || -1 === d ? null : { start: p, end: d };
              } else u = null;
            }
          u = u || { start: 0, end: 0 };
        } else u = null;
        (Kn = { focusedElem: l, selectionRange: u }), (_n = !1), (Hl = i);
        do {
          try {
            Tu();
          } catch (t) {
            if (null === Hl) throw o(Error(330));
            Nu(Hl, t), (Hl = Hl.nextEffect);
          }
        } while (null !== Hl);
        Hl = i;
        do {
          try {
            for (l = t, u = e; null !== Hl; ) {
              var b = Hl.effectTag;
              if ((16 & b && $t(Hl.stateNode, ''), 128 & b)) {
                var w = Hl.alternate;
                if (null !== w) {
                  var x = w.ref;
                  null !== x &&
                    ('function' == typeof x ? x(null) : (x.current = null));
                }
              }
              switch (b & (12 | ge | _e)) {
                case ge:
                  ll(Hl), (Hl.effectTag &= ~ge);
                  break;
                case 6:
                  ll(Hl), (Hl.effectTag &= ~ge), sl(Hl.alternate, Hl);
                  break;
                case _e:
                  Hl.effectTag &= ~_e;
                  break;
                case 1028:
                  (Hl.effectTag &= ~_e), sl(Hl.alternate, Hl);
                  break;
                case 4:
                  sl(Hl.alternate, Hl);
                  break;
                case 8:
                  ul(l, (c = Hl), u), al(c);
              }
              Hl = Hl.nextEffect;
            }
          } catch (t) {
            if (null === Hl) throw o(Error(330));
            Nu(Hl, t), (Hl = Hl.nextEffect);
          }
        } while (null !== Hl);
        if (
          ((x = Kn),
          (w = $n()),
          (b = x.focusedElem),
          (u = x.selectionRange),
          w !== b &&
            b &&
            b.ownerDocument &&
            (function t(e, n) {
              return (
                !(!e || !n) &&
                (e === n ||
                  ((!e || 3 !== e.nodeType) &&
                    (n && 3 === n.nodeType
                      ? t(e, n.parentNode)
                      : 'contains' in e
                      ? e.contains(n)
                      : !!e.compareDocumentPosition &&
                        !!(16 & e.compareDocumentPosition(n)))))
              );
            })(b.ownerDocument.documentElement, b))
        ) {
          null !== u &&
            Yn(b) &&
            ((w = u.start),
            void 0 === (x = u.end) && (x = w),
            'selectionStart' in b
              ? ((b.selectionStart = w),
                (b.selectionEnd = Math.min(x, b.value.length)))
              : (x =
                  ((w = b.ownerDocument || document) && w.defaultView) ||
                  window).getSelection &&
                ((x = x.getSelection()),
                (c = b.textContent.length),
                (l = Math.min(u.start, c)),
                (u = void 0 === u.end ? l : Math.min(u.end, c)),
                !x.extend && l > u && ((c = u), (u = l), (l = c)),
                (c = Wn(b, l)),
                (f = Wn(b, u)),
                c &&
                  f &&
                  (1 !== x.rangeCount ||
                    x.anchorNode !== c.node ||
                    x.anchorOffset !== c.offset ||
                    x.focusNode !== f.node ||
                    x.focusOffset !== f.offset) &&
                  ((w = w.createRange()).setStart(c.node, c.offset),
                  x.removeAllRanges(),
                  l > u
                    ? (x.addRange(w), x.extend(f.node, f.offset))
                    : (w.setEnd(f.node, f.offset), x.addRange(w))))),
            (w = []);
          for (x = b; (x = x.parentNode); )
            1 === x.nodeType &&
              w.push({ element: x, left: x.scrollLeft, top: x.scrollTop });
          for (
            'function' == typeof b.focus && b.focus(), b = 0;
            b < w.length;
            b++
          )
            ((x = w[b]).element.scrollLeft = x.left),
              (x.element.scrollTop = x.top);
        }
        (Kn = null), (_n = !!Qn), (Qn = null), (t.current = n), (Hl = i);
        do {
          try {
            for (b = r; null !== Hl; ) {
              var k = Hl.effectTag;
              if (36 & k) {
                var E = Hl.alternate;
                switch (((x = b), (w = Hl).tag)) {
                  case 0:
                  case 11:
                  case 15:
                    rl(16, 32, w);
                    break;
                  case 1:
                    var T = w.stateNode;
                    if (4 & w.effectTag)
                      if (null === E) T.componentDidMount();
                      else {
                        var S =
                          w.elementType === w.type
                            ? E.memoizedProps
                            : Vi(w.type, E.memoizedProps);
                        T.componentDidUpdate(
                          S,
                          E.memoizedState,
                          T.__reactInternalSnapshotBeforeUpdate
                        );
                      }
                    var C = w.updateQueue;
                    null !== C && da(0, C, T);
                    break;
                  case 3:
                    var M = w.updateQueue;
                    if (null !== M) {
                      if (((l = null), null !== w.child))
                        switch (w.child.tag) {
                          case 5:
                            l = w.child.stateNode;
                            break;
                          case 1:
                            l = w.child.stateNode;
                        }
                      da(0, M, l);
                    }
                    break;
                  case 5:
                    var N = w.stateNode;
                    null === E &&
                      4 & w.effectTag &&
                      ((x = N), Gn(w.type, w.memoizedProps) && x.focus());
                    break;
                  case 6:
                  case 4:
                  case 12:
                    break;
                  case 13:
                    if (null === w.memoizedState) {
                      var P = w.alternate;
                      if (null !== P) {
                        var O = P.memoizedState;
                        if (null !== O) {
                          var A = O.dehydrated;
                          null !== A && ye(A);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 20:
                  case 21:
                    break;
                  default:
                    throw o(Error(163));
                }
              }
              if (128 & k) {
                var L = (w = Hl).ref;
                if (null !== L) {
                  var R = w.stateNode;
                  switch (w.tag) {
                    case 5:
                      var F = R;
                      break;
                    default:
                      F = R;
                  }
                  'function' == typeof L ? L(F) : (L.current = F);
                }
              }
              Hl = Hl.nextEffect;
            }
          } catch (t) {
            if (null === Hl) throw o(Error(330));
            Nu(Hl, t), (Hl = Hl.nextEffect);
          }
        } while (null !== Hl);
        (Hl = null), Ri(), (Ml = a);
      } else t.current = n;
      if (Bl) (Bl = !1), (ql = t), (Vl = e);
      else
        for (Hl = i; null !== Hl; )
          (e = Hl.nextEffect), (Hl.nextEffect = null), (Hl = e);
      if (
        (0 === (e = t.firstPendingTime) && (Yl = null),
        1073741823 === e ? (t === Kl ? Ql++ : ((Ql = 0), (Kl = t))) : (Ql = 0),
        'function' == typeof Au && Au(n.stateNode, r),
        au(t),
        Wl)
      )
        throw ((Wl = !1), (t = $l), ($l = null), t);
      return (Ml & gl) !== vl ? null : (Bi(), null);
    }
    function Tu() {
      for (; null !== Hl; ) {
        var t = Hl.effectTag;
        (256 & t) !== ve && nl(Hl.alternate, Hl),
          (512 & t) === ve ||
            Bl ||
            ((Bl = !0),
            $i(97, function () {
              return Su(), null;
            })),
          (Hl = Hl.nextEffect);
      }
    }
    function Su() {
      if (90 !== Vl) {
        var t = 97 < Vl ? 97 : Vl;
        return (Vl = 90), Wi(t, Cu);
      }
    }
    function Cu() {
      if (null === ql) return !1;
      var t = ql;
      if (((ql = null), (Ml & (_l | bl)) !== vl)) throw o(Error(331));
      var e = Ml;
      for (Ml |= bl, t = t.current.firstEffect; null !== t; ) {
        try {
          var n = t;
          if ((512 & n.effectTag) !== ve)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                rl(128, 0, n), rl(0, 64, n);
            }
        } catch (e) {
          if (null === t) throw o(Error(330));
          Nu(t, e);
        }
        (n = t.nextEffect), (t.nextEffect = null), (t = n);
      }
      return (Ml = e), Bi(), !0;
    }
    function Mu(t, e, n) {
      sa(t, (e = hl(t, (e = Zo(n, e)), 1073741823))),
        null !== (t = ru(t, 1073741823)) && au(t);
    }
    function Nu(t, e) {
      if (3 === t.tag) Mu(t, t, e);
      else
        for (var n = t.return; null !== n; ) {
          if (3 === n.tag) {
            Mu(n, t, e);
            break;
          }
          if (1 === n.tag) {
            var r = n.stateNode;
            if (
              'function' == typeof n.type.getDerivedStateFromError ||
              ('function' == typeof r.componentDidCatch &&
                (null === Yl || !Yl.has(r)))
            ) {
              sa(n, (t = pl(n, (t = Zo(e, t)), 1073741823))),
                null !== (n = ru(n, 1073741823)) && au(n);
              break;
            }
          }
          n = n.return;
        }
    }
    function Pu(t, e, n) {
      var r = t.pingCache;
      null !== r && r.delete(e),
        Nl === t && Ol === n
          ? Al === Tl || (Al === El && 1073741823 === Rl && Ui() - Ul < Dl)
            ? pu(t, Ol)
            : (jl = !0)
          : $u(t, n) &&
            ((0 !== (e = t.lastPingedTime) && e < n) ||
              ((t.lastPingedTime = n),
              t.finishedExpirationTime === n &&
                ((t.finishedExpirationTime = 0), (t.finishedWork = null)),
              au(t)));
    }
    function Ou(t, e) {
      var n = t.stateNode;
      null !== n && n.delete(e),
        1 === (e = 1) && (e = Jl((e = Zl()), t, null)),
        null !== (t = ru(t, e)) && au(t);
    }
    tu = function (t, e, n) {
      var r = e.expirationTime;
      if (null !== t) {
        var i = e.pendingProps;
        if (t.memoizedProps !== i || fi.current) Po = !0;
        else {
          if (r < n) {
            switch (((Po = !1), e.tag)) {
              case 3:
                Uo(e), Mo();
                break;
              case 5:
                if ((Ia(e), 4 & e.mode && 1 !== n && i.hidden))
                  return (e.expirationTime = e.childExpirationTime = 1), null;
                break;
              case 1:
                di(e.type) && _i(e);
                break;
              case 4:
                Fa(e, e.stateNode.containerInfo);
                break;
              case 10:
                Ji(e, e.memoizedProps.value);
                break;
              case 13:
                if (null !== e.memoizedState)
                  return 0 !== (r = e.child.childExpirationTime) && r >= n
                    ? Bo(t, e, n)
                    : (ui(Ua, 1 & Ua.current),
                      null !== (e = Xo(t, e, n)) ? e.sibling : null);
                ui(Ua, 1 & Ua.current);
                break;
              case 19:
                if (
                  ((r = e.childExpirationTime >= n), (64 & t.effectTag) !== ve)
                ) {
                  if (r) return Vo(t, e, n);
                  e.effectTag |= 64;
                }
                if (
                  (null !== (i = e.memoizedState) &&
                    ((i.rendering = null), (i.tail = null)),
                  ui(Ua, Ua.current),
                  !r)
                )
                  return null;
            }
            return Xo(t, e, n);
          }
          Po = !1;
        }
      } else Po = !1;
      switch (((e.expirationTime = 0), e.tag)) {
        case 2:
          if (
            ((r = e.type),
            null !== t &&
              ((t.alternate = null), (e.alternate = null), (e.effectTag |= ge)),
            (t = e.pendingProps),
            (i = pi(e, ci.current)),
            na(e, n),
            (i = io(null, e, r, t, i, n)),
            (e.effectTag |= 1),
            'object' == typeof i &&
              null !== i &&
              'function' == typeof i.render &&
              void 0 === i.$$typeof)
          ) {
            if (((e.tag = 1), ao(), di(r))) {
              var a = !0;
              _i(e);
            } else a = !1;
            e.memoizedState =
              null !== i.state && void 0 !== i.state ? i.state : null;
            var l = r.getDerivedStateFromProps;
            'function' == typeof l && ga(e, r, l, t),
              (i.updater = _a),
              (e.stateNode = i),
              (i._reactInternalFiber = e),
              ka(e, r, t, n),
              (e = jo(null, e, r, !0, a, n));
          } else (e.tag = 0), Oo(null, e, i, n), (e = e.child);
          return e;
        case 16:
          if (
            ((i = e.elementType),
            null !== t &&
              ((t.alternate = null), (e.alternate = null), (e.effectTag |= ge)),
            (t = e.pendingProps),
            (function (t) {
              if (-1 === t._status) {
                t._status = 0;
                var e = t._ctor;
                (e = e()),
                  (t._result = e),
                  e.then(
                    function (e) {
                      0 === t._status &&
                        ((e = e.default), (t._status = 1), (t._result = e));
                    },
                    function (e) {
                      0 === t._status && ((t._status = 2), (t._result = e));
                    }
                  );
              }
            })(i),
            1 !== i._status)
          )
            throw i._result;
          switch (
            ((i = i._result),
            (e.type = i),
            (a = e.tag = (function (t) {
              if ('function' == typeof t) return zu(t) ? 1 : 0;
              if (null != t) {
                if ((t = t.$$typeof) === Y) return 11;
                if (t === V) return 14;
              }
              return 2;
            })(i)),
            (t = Vi(i, t)),
            a)
          ) {
            case 0:
              e = zo(null, e, i, t, n);
              break;
            case 1:
              e = Io(null, e, i, t, n);
              break;
            case 11:
              e = Ao(null, e, i, t, n);
              break;
            case 14:
              e = Lo(null, e, i, Vi(i.type, t), r, n);
              break;
            default:
              throw o(Error(306), i, '');
          }
          return e;
        case 0:
          return (
            (r = e.type),
            (i = e.pendingProps),
            zo(t, e, r, (i = e.elementType === r ? i : Vi(r, i)), n)
          );
        case 1:
          return (
            (r = e.type),
            (i = e.pendingProps),
            Io(t, e, r, (i = e.elementType === r ? i : Vi(r, i)), n)
          );
        case 3:
          if ((Uo(e), null === (r = e.updateQueue))) throw o(Error(282));
          if (
            ((i = null !== (i = e.memoizedState) ? i.element : null),
            pa(e, r, e.pendingProps, null, n),
            (r = e.memoizedState.element) === i)
          )
            Mo(), (e = Xo(t, e, n));
          else {
            if (
              ((i = e.stateNode.hydrate) &&
                ((wo = er(e.stateNode.containerInfo.firstChild)),
                (bo = e),
                (i = xo = !0)),
              i)
            )
              for (n = Na(e, null, r, n), e.child = n; n; )
                (n.effectTag = (n.effectTag & ~ge) | _e), (n = n.sibling);
            else Oo(t, e, r, n), Mo();
            e = e.child;
          }
          return e;
        case 5:
          return (
            Ia(e),
            null === t && To(e),
            (r = e.type),
            (i = e.pendingProps),
            (a = null !== t ? t.memoizedProps : null),
            (l = i.children),
            Zn(r, i)
              ? (l = null)
              : null !== a && Zn(r, a) && (e.effectTag |= 16),
            Fo(t, e),
            4 & e.mode && 1 !== n && i.hidden
              ? ((e.expirationTime = e.childExpirationTime = 1), (e = null))
              : (Oo(t, e, l, n), (e = e.child)),
            e
          );
        case 6:
          return null === t && To(e), null;
        case 13:
          return Bo(t, e, n);
        case 4:
          return (
            Fa(e, e.stateNode.containerInfo),
            (r = e.pendingProps),
            null === t ? (e.child = Ma(e, null, r, n)) : Oo(t, e, r, n),
            e.child
          );
        case 11:
          return (
            (r = e.type),
            (i = e.pendingProps),
            Ao(t, e, r, (i = e.elementType === r ? i : Vi(r, i)), n)
          );
        case 7:
          return Oo(t, e, e.pendingProps, n), e.child;
        case 8:
        case 12:
          return Oo(t, e, e.pendingProps.children, n), e.child;
        case 10:
          t: {
            if (
              ((r = e.type._context),
              (i = e.pendingProps),
              (l = e.memoizedProps),
              Ji(e, (a = i.value)),
              null !== l)
            ) {
              var u = l.value;
              if (
                0 ===
                (a = Xr(u, a)
                  ? 0
                  : 0 |
                    ('function' == typeof r._calculateChangedBits
                      ? r._calculateChangedBits(u, a)
                      : 1073741823))
              ) {
                if (l.children === i.children && !fi.current) {
                  e = Xo(t, e, n);
                  break t;
                }
              } else
                for (null !== (u = e.child) && (u.return = e); null !== u; ) {
                  var s = u.dependencies;
                  if (null !== s) {
                    l = u.child;
                    for (var c = s.firstContext; null !== c; ) {
                      if (c.context === r && 0 != (c.observedBits & a)) {
                        1 === u.tag && (((c = la(n, null)).tag = 2), sa(u, c)),
                          u.expirationTime < n && (u.expirationTime = n),
                          null !== (c = u.alternate) &&
                            c.expirationTime < n &&
                            (c.expirationTime = n),
                          ea(u.return, n),
                          s.expirationTime < n && (s.expirationTime = n);
                        break;
                      }
                      c = c.next;
                    }
                  } else l = 10 === u.tag && u.type === e.type ? null : u.child;
                  if (null !== l) l.return = u;
                  else
                    for (l = u; null !== l; ) {
                      if (l === e) {
                        l = null;
                        break;
                      }
                      if (null !== (u = l.sibling)) {
                        (u.return = l.return), (l = u);
                        break;
                      }
                      l = l.return;
                    }
                  u = l;
                }
            }
            Oo(t, e, i.children, n), (e = e.child);
          }
          return e;
        case 9:
          return (
            (i = e.type),
            (r = (a = e.pendingProps).children),
            na(e, n),
            (r = r((i = ra(i, a.unstable_observedBits)))),
            (e.effectTag |= 1),
            Oo(t, e, r, n),
            e.child
          );
        case 14:
          return (
            (a = Vi((i = e.type), e.pendingProps)),
            Lo(t, e, i, (a = Vi(i.type, a)), r, n)
          );
        case 15:
          return Ro(t, e, e.type, e.pendingProps, r, n);
        case 17:
          return (
            (r = e.type),
            (i = e.pendingProps),
            (i = e.elementType === r ? i : Vi(r, i)),
            null !== t &&
              ((t.alternate = null), (e.alternate = null), (e.effectTag |= ge)),
            (e.tag = 1),
            di(r) ? ((t = !0), _i(e)) : (t = !1),
            na(e, n),
            wa(e, r, i),
            ka(e, r, i, n),
            jo(null, e, r, !0, t, n)
          );
        case 19:
          return Vo(t, e, n);
      }
      throw o(Error(156), e.tag);
    };
    var Au = null,
      Lu = null;
    function Ru(t, e, n, r) {
      (this.tag = t),
        (this.key = n),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = e),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.effectTag = ve),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function Fu(t, e, n, r) {
      return new Ru(t, e, n, r);
    }
    function zu(t) {
      return !(!(t = t.prototype) || !t.isReactComponent);
    }
    function Iu(t, e) {
      var n = t.alternate;
      return (
        null === n
          ? (((n = Fu(t.tag, e, t.key, t.mode)).elementType = t.elementType),
            (n.type = t.type),
            (n.stateNode = t.stateNode),
            (n.alternate = t),
            (t.alternate = n))
          : ((n.pendingProps = e),
            (n.effectTag = ve),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = t.childExpirationTime),
        (n.expirationTime = t.expirationTime),
        (n.child = t.child),
        (n.memoizedProps = t.memoizedProps),
        (n.memoizedState = t.memoizedState),
        (n.updateQueue = t.updateQueue),
        (e = t.dependencies),
        (n.dependencies =
          null === e
            ? null
            : {
                expirationTime: e.expirationTime,
                firstContext: e.firstContext,
                responders: e.responders,
              }),
        (n.sibling = t.sibling),
        (n.index = t.index),
        (n.ref = t.ref),
        n
      );
    }
    function ju(t, e, n, r, i, a) {
      var l = 2;
      if (((r = t), 'function' == typeof t)) zu(t) && (l = 1);
      else if ('string' == typeof t) l = 5;
      else
        t: switch (t) {
          case j:
            return Uu(n.children, i, a, e);
          case $:
            (l = 8), (i |= 7);
            break;
          case U:
            (l = 8), (i |= 1);
            break;
          case D:
            return (
              ((t = Fu(12, n, e, 8 | i)).elementType = D),
              (t.type = D),
              (t.expirationTime = a),
              t
            );
          case B:
            return (
              ((t = Fu(13, n, e, i)).type = B),
              (t.elementType = B),
              (t.expirationTime = a),
              t
            );
          case q:
            return (
              ((t = Fu(19, n, e, i)).elementType = q), (t.expirationTime = a), t
            );
          default:
            if ('object' == typeof t && null !== t)
              switch (t.$$typeof) {
                case H:
                  l = 10;
                  break t;
                case W:
                  l = 9;
                  break t;
                case Y:
                  l = 11;
                  break t;
                case V:
                  l = 14;
                  break t;
                case X:
                  (l = 16), (r = null);
                  break t;
              }
            throw o(Error(130), null == t ? t : typeof t, '');
        }
      return (
        ((e = Fu(l, n, e, i)).elementType = t),
        (e.type = r),
        (e.expirationTime = a),
        e
      );
    }
    function Uu(t, e, n, r) {
      return ((t = Fu(7, t, r, e)).expirationTime = n), t;
    }
    function Du(t, e, n) {
      return ((t = Fu(6, t, null, e)).expirationTime = n), t;
    }
    function Hu(t, e, n) {
      return (
        ((e = Fu(
          4,
          null !== t.children ? t.children : [],
          t.key,
          e
        )).expirationTime = n),
        (e.stateNode = {
          containerInfo: t.containerInfo,
          pendingChildren: null,
          implementation: t.implementation,
        }),
        e
      );
    }
    function Wu(t, e, n) {
      (this.tag = e),
        (this.current = null),
        (this.containerInfo = t),
        (this.pingCache = this.pendingChildren = null),
        (this.finishedExpirationTime = 0),
        (this.finishedWork = null),
        (this.timeoutHandle = -1),
        (this.pendingContext = this.context = null),
        (this.hydrate = n),
        (this.callbackNode = this.firstBatch = null),
        (this.callbackPriority = 90),
        (this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0);
    }
    function $u(t, e) {
      var n = t.firstSuspendedTime;
      return (t = t.lastSuspendedTime), 0 !== n && n >= e && t <= e;
    }
    function Yu(t, e) {
      var n = t.firstSuspendedTime,
        r = t.lastSuspendedTime;
      n < e && (t.firstSuspendedTime = e),
        (r > e || 0 === n) && (t.lastSuspendedTime = e),
        e <= t.lastPingedTime && (t.lastPingedTime = 0),
        e <= t.lastExpiredTime && (t.lastExpiredTime = 0);
    }
    function Bu(t, e) {
      e > t.firstPendingTime && (t.firstPendingTime = e);
      var n = t.firstSuspendedTime;
      0 !== n &&
        (e >= n
          ? (t.firstSuspendedTime = t.lastSuspendedTime = t.nextKnownPendingLevel = 0)
          : e >= t.lastSuspendedTime && (t.lastSuspendedTime = e + 1),
        e > t.nextKnownPendingLevel && (t.nextKnownPendingLevel = e));
    }
    function qu(t, e) {
      var n = t.lastExpiredTime;
      (0 === n || n > e) && (t.lastExpiredTime = e);
    }
    function Vu(t, e, n, r, i, a) {
      var l = e.current;
      t: if (n) {
        e: {
          if (be((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
            throw o(Error(170));
          var u = n;
          do {
            switch (u.tag) {
              case 3:
                u = u.stateNode.context;
                break e;
              case 1:
                if (di(u.type)) {
                  u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                  break e;
                }
            }
            u = u.return;
          } while (null !== u);
          throw o(Error(171));
        }
        if (1 === n.tag) {
          var s = n.type;
          if (di(s)) {
            n = gi(n, s, u);
            break t;
          }
        }
        n = u;
      } else n = si;
      return (
        null === e.context ? (e.context = n) : (e.pendingContext = n),
        (e = a),
        ((i = la(r, i)).payload = { element: t }),
        null !== (e = void 0 === e ? null : e) && (i.callback = e),
        sa(l, i),
        nu(l, r),
        r
      );
    }
    function Xu(t, e, n, r) {
      var i = e.current,
        a = Zl(),
        o = ya.suspense;
      return Vu(t, e, n, (i = Jl(a, i, o)), o, r);
    }
    function Qu(t) {
      if (!(t = t.current).child) return null;
      switch (t.child.tag) {
        case 5:
        default:
          return t.child.stateNode;
      }
    }
    function Ku(t) {
      var e = 1073741821 - 25 * (1 + (((1073741821 - Zl() + 500) / 25) | 0));
      e <= eu && --e,
        (this._expirationTime = eu = e),
        (this._root = t),
        (this._callbacks = this._next = null),
        (this._hasChildren = this._didComplete = !1),
        (this._children = null),
        (this._defer = !0);
    }
    function Gu() {
      (this._callbacks = null),
        (this._didCommit = !1),
        (this._onCommit = this._onCommit.bind(this));
    }
    function Zu(t, e, n) {
      var r = new Wu(t, e, (n = null != n && !0 === n.hydrate)),
        i = Fu(3, null, null, 2 === e ? 7 : 1 === e ? 3 : 0);
      return (
        (r.current = i),
        (i.stateNode = r),
        (t[or] = r.current),
        n &&
          0 !== e &&
          (function (t) {
            var e = Nn(t);
            le.forEach(function (n) {
              Pn(n, t, e);
            }),
              ue.forEach(function (n) {
                Pn(n, t, e);
              });
          })(9 === t.nodeType ? t : t.ownerDocument),
        r
      );
    }
    function Ju(t, e, n) {
      this._internalRoot = Zu(t, e, n);
    }
    function ts(t, e) {
      this._internalRoot = Zu(t, 2, e);
    }
    function es(t) {
      return !(
        !t ||
        (1 !== t.nodeType &&
          9 !== t.nodeType &&
          11 !== t.nodeType &&
          (8 !== t.nodeType || ' react-mount-point-unstable ' !== t.nodeValue))
      );
    }
    function ns(t, e, n, r, i) {
      var a = n._reactRootContainer;
      if (a) {
        var o = a._internalRoot;
        if ('function' == typeof i) {
          var l = i;
          i = function () {
            var t = Qu(o);
            l.call(t);
          };
        }
        Xu(e, o, t, i);
      } else {
        if (
          ((a = n._reactRootContainer = (function (t, e) {
            if (
              (e ||
                (e = !(
                  !(e = t
                    ? 9 === t.nodeType
                      ? t.documentElement
                      : t.firstChild
                    : null) ||
                  1 !== e.nodeType ||
                  !e.hasAttribute('data-reactroot')
                )),
              !e)
            )
              for (var n; (n = t.lastChild); ) t.removeChild(n);
            return new Ju(t, 0, e ? { hydrate: !0 } : void 0);
          })(n, r)),
          (o = a._internalRoot),
          'function' == typeof i)
        ) {
          var u = i;
          i = function () {
            var t = Qu(o);
            u.call(t);
          };
        }
        hu(function () {
          Xu(e, o, t, i);
        });
      }
      return Qu(o);
    }
    function rs(t, e) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!es(e)) throw o(Error(200));
      return (function (t, e, n) {
        var r =
          3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: I,
          key: null == r ? null : '' + r,
          children: t,
          containerInfo: e,
          implementation: n,
        };
      })(t, e, null, n);
    }
    (tt = function (t, e, n) {
      switch (e) {
        case 'input':
          if ((Nt(t, n), (e = n.name), 'radio' === n.type && null != e)) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name=' + JSON.stringify('' + e) + '][type="radio"]'
              ),
                e = 0;
              e < n.length;
              e++
            ) {
              var r = n[e];
              if (r !== t && r.form === t.form) {
                var i = cr(r);
                if (!i) throw o(Error(90));
                Tt(r), Nt(r, i);
              }
            }
          }
          break;
        case 'textarea':
          zt(t, n);
          break;
        case 'select':
          null != (e = n.value) && Lt(t, !!n.multiple, e, !1);
      }
    }),
      (Ku.prototype.render = function (t) {
        if (!this._defer) throw o(Error(250));
        (this._hasChildren = !0), (this._children = t);
        var e = this._root._internalRoot,
          n = this._expirationTime,
          r = new Gu();
        return Vu(t, e, null, n, null, r._onCommit), r;
      }),
      (Ku.prototype.then = function (t) {
        if (this._didComplete) t();
        else {
          var e = this._callbacks;
          null === e && (e = this._callbacks = []), e.push(t);
        }
      }),
      (Ku.prototype.commit = function () {
        var t = this._root._internalRoot,
          e = t.firstBatch;
        if (!this._defer || null === e) throw o(Error(251));
        if (this._hasChildren) {
          var n = this._expirationTime;
          if (e !== this) {
            this._hasChildren &&
              ((n = this._expirationTime = e._expirationTime),
              this.render(this._children));
            for (var r = null, i = e; i !== this; ) (r = i), (i = i._next);
            if (null === r) throw o(Error(251));
            (r._next = i._next), (this._next = e), (t.firstBatch = this);
          }
          if (((this._defer = !1), (e = n), (Ml & (_l | bl)) !== vl))
            throw o(Error(253));
          qu(t, e),
            au(t),
            Bi(),
            (e = this._next),
            (this._next = null),
            null !== (e = t.firstBatch = e) &&
              e._hasChildren &&
              e.render(e._children);
        } else (this._next = null), (this._defer = !1);
      }),
      (Ku.prototype._onComplete = function () {
        if (!this._didComplete) {
          this._didComplete = !0;
          var t = this._callbacks;
          if (null !== t) for (var e = 0; e < t.length; e++) (0, t[e])();
        }
      }),
      (Gu.prototype.then = function (t) {
        if (this._didCommit) t();
        else {
          var e = this._callbacks;
          null === e && (e = this._callbacks = []), e.push(t);
        }
      }),
      (Gu.prototype._onCommit = function () {
        if (!this._didCommit) {
          this._didCommit = !0;
          var t = this._callbacks;
          if (null !== t)
            for (var e = 0; e < t.length; e++) {
              var n = t[e];
              if ('function' != typeof n) throw o(Error(191), n);
              n();
            }
        }
      }),
      (ts.prototype.render = Ju.prototype.render = function (t, e) {
        var n = this._internalRoot,
          r = new Gu();
        return (
          null !== (e = void 0 === e ? null : e) && r.then(e),
          Xu(t, n, null, r._onCommit),
          r
        );
      }),
      (ts.prototype.unmount = Ju.prototype.unmount = function (t) {
        var e = this._internalRoot,
          n = new Gu();
        return (
          null !== (t = void 0 === t ? null : t) && n.then(t),
          Xu(null, e, null, n._onCommit),
          n
        );
      }),
      (ts.prototype.createBatch = function () {
        var t = new Ku(this),
          e = t._expirationTime,
          n = this._internalRoot,
          r = n.firstBatch;
        if (null === r) (n.firstBatch = t), (t._next = null);
        else {
          for (n = null; null !== r && r._expirationTime >= e; )
            (n = r), (r = r._next);
          (t._next = r), null !== n && (n._next = t);
        }
        return t;
      }),
      (ot = cu),
      (lt = fu),
      (ut = uu),
      (st = function (t, e) {
        var n = Ml;
        Ml |= 2;
        try {
          return t(e);
        } finally {
          (Ml = n) === vl && Bi();
        }
      });
    var is,
      as,
      os = {
        createPortal: rs,
        findDOMNode: function (t) {
          if (null == t) t = null;
          else if (1 !== t.nodeType) {
            var e = t._reactInternalFiber;
            if (void 0 === e) {
              if ('function' == typeof t.render) throw o(Error(188));
              throw o(Error(268), Object.keys(t));
            }
            t = null === (t = xe(e)) ? null : t.stateNode;
          }
          return t;
        },
        hydrate: function (t, e, n) {
          if (!es(e)) throw o(Error(200));
          return ns(null, t, e, !0, n);
        },
        render: function (t, e, n) {
          if (!es(e)) throw o(Error(200));
          return ns(null, t, e, !1, n);
        },
        unstable_renderSubtreeIntoContainer: function (t, e, n, r) {
          if (!es(n)) throw o(Error(200));
          if (null == t || void 0 === t._reactInternalFiber) throw o(Error(38));
          return ns(t, e, n, !1, r);
        },
        unmountComponentAtNode: function (t) {
          if (!es(t)) throw o(Error(40));
          return (
            !!t._reactRootContainer &&
            (hu(function () {
              ns(null, null, t, !1, function () {
                t._reactRootContainer = null;
              });
            }),
            !0)
          );
        },
        unstable_createPortal: function () {
          return rs.apply(void 0, arguments);
        },
        unstable_batchedUpdates: cu,
        unstable_interactiveUpdates: function (t, e, n, r) {
          return uu(), fu(t, e, n, r);
        },
        unstable_discreteUpdates: fu,
        unstable_flushDiscreteUpdates: uu,
        flushSync: function (t, e) {
          if ((Ml & (_l | bl)) !== vl) throw o(Error(187));
          var n = Ml;
          Ml |= 1;
          try {
            return Wi(99, t.bind(null, e));
          } finally {
            (Ml = n), Bi();
          }
        },
        unstable_createRoot: function (t, e) {
          if (!es(t)) throw o(Error(299), 'unstable_createRoot');
          return new ts(t, e);
        },
        unstable_createSyncRoot: function (t, e) {
          if (!es(t)) throw o(Error(299), 'unstable_createRoot');
          return new Ju(t, 1, e);
        },
        unstable_flushControlled: function (t) {
          var e = Ml;
          Ml |= 1;
          try {
            Wi(99, t);
          } finally {
            (Ml = e) === vl && Bi();
          }
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          Events: [
            ur,
            sr,
            cr,
            O.injectEventPluginsByName,
            h,
            Ne,
            function (t) {
              C(t, Me);
            },
            it,
            at,
            Tn,
            P,
            Su,
            { current: !1 },
          ],
        },
      };
    (as = (is = {
      findFiberByHostInstance: lr,
      bundleType: 0,
      version: '16.10.0',
      rendererPackageName: 'react-dom',
    }).findFiberByHostInstance),
      (function (t) {
        if ('undefined' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var e = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (e.isDisabled || !e.supportsFiber) return !0;
        try {
          var n = e.inject(t);
          (Au = function (t) {
            try {
              e.onCommitFiberRoot(
                n,
                t,
                void 0,
                64 == (64 & t.current.effectTag)
              );
            } catch (t) {}
          }),
            (Lu = function (t) {
              try {
                e.onCommitFiberUnmount(n, t);
              } catch (t) {}
            });
        } catch (t) {}
      })(
        i({}, is, {
          overrideHookState: null,
          overrideProps: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: L.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (t) {
            return null === (t = xe(t)) ? null : t.stateNode;
          },
          findFiberByHostInstance: function (t) {
            return as ? as(t) : null;
          },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
        })
      );
    var ls = { default: os },
      us = (ls && os) || ls;
    t.exports = us.default || us;
  },
  function (t, e, n) {
    'use strict';
    t.exports = n(61);
  },
  function (t, e, n) {
    'use strict';
    /** @license React v0.16.0
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r, i, a, o, l;
    if (
      (Object.defineProperty(e, '__esModule', { value: !0 }),
      'undefined' == typeof window || 'function' != typeof MessageChannel)
    ) {
      var u = null,
        s = null,
        c = function () {
          if (null !== u)
            try {
              var t = e.unstable_now();
              u(!0, t), (u = null);
            } catch (t) {
              throw (setTimeout(c, 0), t);
            }
        },
        f = Date.now();
      (e.unstable_now = function () {
        return Date.now() - f;
      }),
        (r = function (t) {
          null !== u ? setTimeout(r, 0, t) : ((u = t), setTimeout(c, 0));
        }),
        (i = function (t, e) {
          s = setTimeout(t, e);
        }),
        (a = function () {
          clearTimeout(s);
        }),
        (o = function () {
          return !1;
        }),
        (l = e.unstable_forceFrameRate = function () {});
    } else {
      var h = window.performance,
        p = window.Date,
        d = window.setTimeout,
        m = window.clearTimeout,
        y = window.requestAnimationFrame,
        v = window.cancelAnimationFrame;
      if (
        ('undefined' != typeof console &&
          ('function' != typeof y &&
            console.error(
              "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            ),
          'function' != typeof v &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            )),
        'object' == typeof h && 'function' == typeof h.now)
      )
        e.unstable_now = function () {
          return h.now();
        };
      else {
        var g = p.now();
        e.unstable_now = function () {
          return p.now() - g;
        };
      }
      var _ = !1,
        b = null,
        w = -1,
        x = 5,
        k = 0;
      (o = function () {
        return e.unstable_now() >= k;
      }),
        (l = function () {}),
        (e.unstable_forceFrameRate = function (t) {
          0 > t || 125 < t
            ? console.error(
                'forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported'
              )
            : (x = 0 < t ? Math.floor(1e3 / t) : 33.33);
        });
      var E = new MessageChannel(),
        T = E.port2;
      (E.port1.onmessage = function () {
        if (null !== b) {
          var t = e.unstable_now();
          k = t + x;
          try {
            b(!0, t) ? T.postMessage(null) : ((_ = !1), (b = null));
          } catch (t) {
            throw (T.postMessage(null), t);
          }
        } else _ = !1;
      }),
        (r = function (t) {
          (b = t), _ || ((_ = !0), T.postMessage(null));
        }),
        (i = function (t, n) {
          w = d(function () {
            t(e.unstable_now());
          }, n);
        }),
        (a = function () {
          m(w), (w = -1);
        });
    }
    function S(t, e) {
      var n = t.length;
      t.push(e);
      t: for (;;) {
        var r = Math.floor((n - 1) / 2),
          i = t[r];
        if (!(void 0 !== i && 0 < N(i, e))) break t;
        (t[r] = e), (t[n] = i), (n = r);
      }
    }
    function C(t) {
      return void 0 === (t = t[0]) ? null : t;
    }
    function M(t) {
      var e = t[0];
      if (void 0 !== e) {
        var n = t.pop();
        if (n !== e) {
          t[0] = n;
          t: for (var r = 0, i = t.length; r < i; ) {
            var a = 2 * (r + 1) - 1,
              o = t[a],
              l = a + 1,
              u = t[l];
            if (void 0 !== o && 0 > N(o, n))
              void 0 !== u && 0 > N(u, o)
                ? ((t[r] = u), (t[l] = n), (r = l))
                : ((t[r] = o), (t[a] = n), (r = a));
            else {
              if (!(void 0 !== u && 0 > N(u, n))) break t;
              (t[r] = u), (t[l] = n), (r = l);
            }
          }
        }
        return e;
      }
      return null;
    }
    function N(t, e) {
      var n = t.sortIndex - e.sortIndex;
      return 0 !== n ? n : t.id - e.id;
    }
    var P = [],
      O = [],
      A = 1,
      L = null,
      R = 3,
      F = !1,
      z = !1,
      I = !1;
    function j(t) {
      for (var e = C(O); null !== e; ) {
        if (null === e.callback) M(O);
        else {
          if (!(e.startTime <= t)) break;
          M(O), (e.sortIndex = e.expirationTime), S(P, e);
        }
        e = C(O);
      }
    }
    function U(t) {
      if (((I = !1), j(t), !z))
        if (null !== C(P)) (z = !0), r(D);
        else {
          var e = C(O);
          null !== e && i(U, e.startTime - t);
        }
    }
    function D(t, n) {
      (z = !1), I && ((I = !1), a()), (F = !0);
      var r = R;
      try {
        for (
          j(n), L = C(P);
          null !== L && (!(L.expirationTime > n) || (t && !o()));

        ) {
          var l = L.callback;
          if (null !== l) {
            (L.callback = null), (R = L.priorityLevel);
            var u = l(L.expirationTime <= n);
            (n = e.unstable_now()),
              'function' == typeof u ? (L.callback = u) : L === C(P) && M(P),
              j(n);
          } else M(P);
          L = C(P);
        }
        if (null !== L) var s = !0;
        else {
          var c = C(O);
          null !== c && i(U, c.startTime - n), (s = !1);
        }
        return s;
      } finally {
        (L = null), (R = r), (F = !1);
      }
    }
    function H(t) {
      switch (t) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    var W = l;
    (e.unstable_ImmediatePriority = 1),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_NormalPriority = 3),
      (e.unstable_IdlePriority = 5),
      (e.unstable_LowPriority = 4),
      (e.unstable_runWithPriority = function (t, e) {
        switch (t) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            t = 3;
        }
        var n = R;
        R = t;
        try {
          return e();
        } finally {
          R = n;
        }
      }),
      (e.unstable_next = function (t) {
        switch (R) {
          case 1:
          case 2:
          case 3:
            var e = 3;
            break;
          default:
            e = R;
        }
        var n = R;
        R = e;
        try {
          return t();
        } finally {
          R = n;
        }
      }),
      (e.unstable_scheduleCallback = function (t, n, o) {
        var l = e.unstable_now();
        if ('object' == typeof o && null !== o) {
          var u = o.delay;
          (u = 'number' == typeof u && 0 < u ? l + u : l),
            (o = 'number' == typeof o.timeout ? o.timeout : H(t));
        } else (o = H(t)), (u = l);
        return (
          (t = {
            id: A++,
            callback: n,
            priorityLevel: t,
            startTime: u,
            expirationTime: (o = u + o),
            sortIndex: -1,
          }),
          u > l
            ? ((t.sortIndex = u),
              S(O, t),
              null === C(P) && t === C(O) && (I ? a() : (I = !0), i(U, u - l)))
            : ((t.sortIndex = o), S(P, t), z || F || ((z = !0), r(D))),
          t
        );
      }),
      (e.unstable_cancelCallback = function (t) {
        t.callback = null;
      }),
      (e.unstable_wrapCallback = function (t) {
        var e = R;
        return function () {
          var n = R;
          R = e;
          try {
            return t.apply(this, arguments);
          } finally {
            R = n;
          }
        };
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return R;
      }),
      (e.unstable_shouldYield = function () {
        var t = e.unstable_now();
        j(t);
        var n = C(P);
        return (
          (n !== L &&
            null !== L &&
            null !== n &&
            null !== n.callback &&
            n.startTime <= t &&
            n.expirationTime < L.expirationTime) ||
          o()
        );
      }),
      (e.unstable_requestPaint = W),
      (e.unstable_continueExecution = function () {
        z || F || ((z = !0), r(D));
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_getFirstCallbackNode = function () {
        return C(P);
      }),
      (e.unstable_Profiling = null);
  },
  function (t, e) {
    t.exports = function (t) {
      if (Array.isArray(t)) return t;
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      if (
        Symbol.iterator in Object(t) ||
        '[object Arguments]' === Object.prototype.toString.call(t)
      ) {
        var n = [],
          r = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var o, l = t[Symbol.iterator]();
            !(r = (o = l.next()).done) &&
            (n.push(o.value), !e || n.length !== e);
            r = !0
          );
        } catch (t) {
          (i = !0), (a = t);
        } finally {
          try {
            r || null == l.return || l.return();
          } finally {
            if (i) throw a;
          }
        }
        return n;
      }
    };
  },
  function (t, e) {
    t.exports = function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    };
  },
  function (t, e, n) {
    var r = (function (t) {
      'use strict';
      var e,
        n = Object.prototype,
        r = n.hasOwnProperty,
        i = 'function' == typeof Symbol ? Symbol : {},
        a = i.iterator || '@@iterator',
        o = i.asyncIterator || '@@asyncIterator',
        l = i.toStringTag || '@@toStringTag';
      function u(t, e, n, r) {
        var i = e && e.prototype instanceof m ? e : m,
          a = Object.create(i.prototype),
          o = new C(r || []);
        return (
          (a._invoke = (function (t, e, n) {
            var r = c;
            return function (i, a) {
              if (r === h) throw new Error('Generator is already running');
              if (r === p) {
                if ('throw' === i) throw a;
                return N();
              }
              for (n.method = i, n.arg = a; ; ) {
                var o = n.delegate;
                if (o) {
                  var l = E(o, n);
                  if (l) {
                    if (l === d) continue;
                    return l;
                  }
                }
                if ('next' === n.method) n.sent = n._sent = n.arg;
                else if ('throw' === n.method) {
                  if (r === c) throw ((r = p), n.arg);
                  n.dispatchException(n.arg);
                } else 'return' === n.method && n.abrupt('return', n.arg);
                r = h;
                var u = s(t, e, n);
                if ('normal' === u.type) {
                  if (((r = n.done ? p : f), u.arg === d)) continue;
                  return { value: u.arg, done: n.done };
                }
                'throw' === u.type &&
                  ((r = p), (n.method = 'throw'), (n.arg = u.arg));
              }
            };
          })(t, n, o)),
          a
        );
      }
      function s(t, e, n) {
        try {
          return { type: 'normal', arg: t.call(e, n) };
        } catch (t) {
          return { type: 'throw', arg: t };
        }
      }
      t.wrap = u;
      var c = 'suspendedStart',
        f = 'suspendedYield',
        h = 'executing',
        p = 'completed',
        d = {};
      function m() {}
      function y() {}
      function v() {}
      var g = {};
      g[a] = function () {
        return this;
      };
      var _ = Object.getPrototypeOf,
        b = _ && _(_(M([])));
      b && b !== n && r.call(b, a) && (g = b);
      var w = (v.prototype = m.prototype = Object.create(g));
      function x(t) {
        ['next', 'throw', 'return'].forEach(function (e) {
          t[e] = function (t) {
            return this._invoke(e, t);
          };
        });
      }
      function k(t) {
        var e;
        this._invoke = function (n, i) {
          function a() {
            return new Promise(function (e, a) {
              !(function e(n, i, a, o) {
                var l = s(t[n], t, i);
                if ('throw' !== l.type) {
                  var u = l.arg,
                    c = u.value;
                  return c && 'object' == typeof c && r.call(c, '__await')
                    ? Promise.resolve(c.__await).then(
                        function (t) {
                          e('next', t, a, o);
                        },
                        function (t) {
                          e('throw', t, a, o);
                        }
                      )
                    : Promise.resolve(c).then(
                        function (t) {
                          (u.value = t), a(u);
                        },
                        function (t) {
                          return e('throw', t, a, o);
                        }
                      );
                }
                o(l.arg);
              })(n, i, e, a);
            });
          }
          return (e = e ? e.then(a, a) : a());
        };
      }
      function E(t, n) {
        var r = t.iterator[n.method];
        if (r === e) {
          if (((n.delegate = null), 'throw' === n.method)) {
            if (
              t.iterator.return &&
              ((n.method = 'return'),
              (n.arg = e),
              E(t, n),
              'throw' === n.method)
            )
              return d;
            (n.method = 'throw'),
              (n.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return d;
        }
        var i = s(r, t.iterator, n.arg);
        if ('throw' === i.type)
          return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), d;
        var a = i.arg;
        return a
          ? a.done
            ? ((n[t.resultName] = a.value),
              (n.next = t.nextLoc),
              'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
              (n.delegate = null),
              d)
            : a
          : ((n.method = 'throw'),
            (n.arg = new TypeError('iterator result is not an object')),
            (n.delegate = null),
            d);
      }
      function T(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function S(t) {
        var e = t.completion || {};
        (e.type = 'normal'), delete e.arg, (t.completion = e);
      }
      function C(t) {
        (this.tryEntries = [{ tryLoc: 'root' }]),
          t.forEach(T, this),
          this.reset(!0);
      }
      function M(t) {
        if (t) {
          var n = t[a];
          if (n) return n.call(t);
          if ('function' == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var i = -1,
              o = function n() {
                for (; ++i < t.length; )
                  if (r.call(t, i)) return (n.value = t[i]), (n.done = !1), n;
                return (n.value = e), (n.done = !0), n;
              };
            return (o.next = o);
          }
        }
        return { next: N };
      }
      function N() {
        return { value: e, done: !0 };
      }
      return (
        (y.prototype = w.constructor = v),
        (v.constructor = y),
        (v[l] = y.displayName = 'GeneratorFunction'),
        (t.isGeneratorFunction = function (t) {
          var e = 'function' == typeof t && t.constructor;
          return (
            !!e &&
            (e === y || 'GeneratorFunction' === (e.displayName || e.name))
          );
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, v)
              : ((t.__proto__ = v), l in t || (t[l] = 'GeneratorFunction')),
            (t.prototype = Object.create(w)),
            t
          );
        }),
        (t.awrap = function (t) {
          return { __await: t };
        }),
        x(k.prototype),
        (k.prototype[o] = function () {
          return this;
        }),
        (t.AsyncIterator = k),
        (t.async = function (e, n, r, i) {
          var a = new k(u(e, n, r, i));
          return t.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(w),
        (w[l] = 'Generator'),
        (w[a] = function () {
          return this;
        }),
        (w.toString = function () {
          return '[object Generator]';
        }),
        (t.keys = function (t) {
          var e = [];
          for (var n in t) e.push(n);
          return (
            e.reverse(),
            function n() {
              for (; e.length; ) {
                var r = e.pop();
                if (r in t) return (n.value = r), (n.done = !1), n;
              }
              return (n.done = !0), n;
            }
          );
        }),
        (t.values = M),
        (C.prototype = {
          constructor: C,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = e),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = e),
              this.tryEntries.forEach(S),
              !t)
            )
              for (var n in this)
                't' === n.charAt(0) &&
                  r.call(this, n) &&
                  !isNaN(+n.slice(1)) &&
                  (this[n] = e);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ('throw' === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var n = this;
            function i(r, i) {
              return (
                (l.type = 'throw'),
                (l.arg = t),
                (n.next = r),
                i && ((n.method = 'next'), (n.arg = e)),
                !!i
              );
            }
            for (var a = this.tryEntries.length - 1; a >= 0; --a) {
              var o = this.tryEntries[a],
                l = o.completion;
              if ('root' === o.tryLoc) return i('end');
              if (o.tryLoc <= this.prev) {
                var u = r.call(o, 'catchLoc'),
                  s = r.call(o, 'finallyLoc');
                if (u && s) {
                  if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                  if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                } else if (u) {
                  if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                } else {
                  if (!s)
                    throw new Error('try statement without catch or finally');
                  if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n];
              if (
                i.tryLoc <= this.prev &&
                r.call(i, 'finallyLoc') &&
                this.prev < i.finallyLoc
              ) {
                var a = i;
                break;
              }
            }
            a &&
              ('break' === t || 'continue' === t) &&
              a.tryLoc <= e &&
              e <= a.finallyLoc &&
              (a = null);
            var o = a ? a.completion : {};
            return (
              (o.type = t),
              (o.arg = e),
              a
                ? ((this.method = 'next'), (this.next = a.finallyLoc), d)
                : this.complete(o)
            );
          },
          complete: function (t, e) {
            if ('throw' === t.type) throw t.arg;
            return (
              'break' === t.type || 'continue' === t.type
                ? (this.next = t.arg)
                : 'return' === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === t.type && e && (this.next = e),
              d
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), S(n), d;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ('throw' === r.type) {
                  var i = r.arg;
                  S(n);
                }
                return i;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function (t, n, r) {
            return (
              (this.delegate = { iterator: M(t), resultName: n, nextLoc: r }),
              'next' === this.method && (this.arg = e),
              d
            );
          },
        }),
        t
      );
    })(t.exports);
    try {
      regeneratorRuntime = r;
    } catch (t) {
      Function('r', 'regeneratorRuntime = r')(r);
    }
  },
  function (t, e, n) {
    (function (t) {
      var r =
          (void 0 !== t && t) || ('undefined' != typeof self && self) || window,
        i = Function.prototype.apply;
      function a(t, e) {
        (this._id = t), (this._clearFn = e);
      }
      (e.setTimeout = function () {
        return new a(i.call(setTimeout, r, arguments), clearTimeout);
      }),
        (e.setInterval = function () {
          return new a(i.call(setInterval, r, arguments), clearInterval);
        }),
        (e.clearTimeout = e.clearInterval = function (t) {
          t && t.close();
        }),
        (a.prototype.unref = a.prototype.ref = function () {}),
        (a.prototype.close = function () {
          this._clearFn.call(r, this._id);
        }),
        (e.enroll = function (t, e) {
          clearTimeout(t._idleTimeoutId), (t._idleTimeout = e);
        }),
        (e.unenroll = function (t) {
          clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1);
        }),
        (e._unrefActive = e.active = function (t) {
          clearTimeout(t._idleTimeoutId);
          var e = t._idleTimeout;
          e >= 0 &&
            (t._idleTimeoutId = setTimeout(function () {
              t._onTimeout && t._onTimeout();
            }, e));
        }),
        n(67),
        (e.setImmediate =
          ('undefined' != typeof self && self.setImmediate) ||
          (void 0 !== t && t.setImmediate) ||
          (this && this.setImmediate)),
        (e.clearImmediate =
          ('undefined' != typeof self && self.clearImmediate) ||
          (void 0 !== t && t.clearImmediate) ||
          (this && this.clearImmediate));
    }.call(this, n(10)));
  },
  function (t, e, n) {
    (function (t, e) {
      !(function (t, n) {
        'use strict';
        if (!t.setImmediate) {
          var r,
            i,
            a,
            o,
            l,
            u = 1,
            s = {},
            c = !1,
            f = t.document,
            h = Object.getPrototypeOf && Object.getPrototypeOf(t);
          (h = h && h.setTimeout ? h : t),
            '[object process]' === {}.toString.call(t.process)
              ? (r = function (t) {
                  e.nextTick(function () {
                    d(t);
                  });
                })
              : !(function () {
                  if (t.postMessage && !t.importScripts) {
                    var e = !0,
                      n = t.onmessage;
                    return (
                      (t.onmessage = function () {
                        e = !1;
                      }),
                      t.postMessage('', '*'),
                      (t.onmessage = n),
                      e
                    );
                  }
                })()
              ? t.MessageChannel
                ? (((a = new MessageChannel()).port1.onmessage = function (t) {
                    d(t.data);
                  }),
                  (r = function (t) {
                    a.port2.postMessage(t);
                  }))
                : f && 'onreadystatechange' in f.createElement('script')
                ? ((i = f.documentElement),
                  (r = function (t) {
                    var e = f.createElement('script');
                    (e.onreadystatechange = function () {
                      d(t),
                        (e.onreadystatechange = null),
                        i.removeChild(e),
                        (e = null);
                    }),
                      i.appendChild(e);
                  }))
                : (r = function (t) {
                    setTimeout(d, 0, t);
                  })
              : ((o = 'setImmediate$' + Math.random() + '$'),
                (l = function (e) {
                  e.source === t &&
                    'string' == typeof e.data &&
                    0 === e.data.indexOf(o) &&
                    d(+e.data.slice(o.length));
                }),
                t.addEventListener
                  ? t.addEventListener('message', l, !1)
                  : t.attachEvent('onmessage', l),
                (r = function (e) {
                  t.postMessage(o + e, '*');
                })),
            (h.setImmediate = function (t) {
              'function' != typeof t && (t = new Function('' + t));
              for (
                var e = new Array(arguments.length - 1), n = 0;
                n < e.length;
                n++
              )
                e[n] = arguments[n + 1];
              var i = { callback: t, args: e };
              return (s[u] = i), r(u), u++;
            }),
            (h.clearImmediate = p);
        }
        function p(t) {
          delete s[t];
        }
        function d(t) {
          if (c) setTimeout(d, 0, t);
          else {
            var e = s[t];
            if (e) {
              c = !0;
              try {
                !(function (t) {
                  var e = t.callback,
                    r = t.args;
                  switch (r.length) {
                    case 0:
                      e();
                      break;
                    case 1:
                      e(r[0]);
                      break;
                    case 2:
                      e(r[0], r[1]);
                      break;
                    case 3:
                      e(r[0], r[1], r[2]);
                      break;
                    default:
                      e.apply(n, r);
                  }
                })(e);
              } finally {
                p(t), (c = !1);
              }
            }
          }
        }
      })('undefined' == typeof self ? (void 0 === t ? this : t) : self);
    }.call(this, n(10), n(68)));
  },
  function (t, e) {
    var n,
      r,
      i = (t.exports = {});
    function a() {
      throw new Error('setTimeout has not been defined');
    }
    function o() {
      throw new Error('clearTimeout has not been defined');
    }
    function l(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === a || !n) && setTimeout)
        return (n = setTimeout), setTimeout(t, 0);
      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }
    !(function () {
      try {
        n = 'function' == typeof setTimeout ? setTimeout : a;
      } catch (t) {
        n = a;
      }
      try {
        r = 'function' == typeof clearTimeout ? clearTimeout : o;
      } catch (t) {
        r = o;
      }
    })();
    var u,
      s = [],
      c = !1,
      f = -1;
    function h() {
      c &&
        u &&
        ((c = !1), u.length ? (s = u.concat(s)) : (f = -1), s.length && p());
    }
    function p() {
      if (!c) {
        var t = l(h);
        c = !0;
        for (var e = s.length; e; ) {
          for (u = s, s = []; ++f < e; ) u && u[f].run();
          (f = -1), (e = s.length);
        }
        (u = null),
          (c = !1),
          (function (t) {
            if (r === clearTimeout) return clearTimeout(t);
            if ((r === o || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(t);
            try {
              r(t);
            } catch (e) {
              try {
                return r.call(null, t);
              } catch (e) {
                return r.call(this, t);
              }
            }
          })(t);
      }
    }
    function d(t, e) {
      (this.fun = t), (this.array = e);
    }
    function m() {}
    (i.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      s.push(new d(t, e)), 1 !== s.length || c || l(p);
    }),
      (d.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (i.title = 'browser'),
      (i.browser = !0),
      (i.env = {}),
      (i.argv = []),
      (i.version = ''),
      (i.versions = {}),
      (i.on = m),
      (i.addListener = m),
      (i.once = m),
      (i.off = m),
      (i.removeListener = m),
      (i.removeAllListeners = m),
      (i.emit = m),
      (i.prependListener = m),
      (i.prependOnceListener = m),
      (i.listeners = function (t) {
        return [];
      }),
      (i.binding = function (t) {
        throw new Error('process.binding is not supported');
      }),
      (i.cwd = function () {
        return '/';
      }),
      (i.chdir = function (t) {
        throw new Error('process.chdir is not supported');
      }),
      (i.umask = function () {
        return 0;
      });
  },
  function (t, e, n) {
    'use strict';
    var r = n(70);
    function i() {}
    function a() {}
    (a.resetWarningCache = i),
      (t.exports = function () {
        function t(t, e, n, i, a, o) {
          if (o !== r) {
            var l = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
            throw ((l.name = 'Invariant Violation'), l);
          }
        }
        function e() {
          return t;
        }
        t.isRequired = t;
        var n = {
          array: t,
          bool: t,
          func: t,
          number: t,
          object: t,
          string: t,
          symbol: t,
          any: t,
          arrayOf: e,
          element: t,
          elementType: t,
          instanceOf: e,
          node: t,
          objectOf: e,
          oneOf: e,
          oneOfType: e,
          shape: e,
          exact: e,
          checkPropTypes: a,
          resetWarningCache: i,
        };
        return (n.PropTypes = n), n;
      });
  },
  function (t, e, n) {
    'use strict';
    t.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  function (t, e, n) {
    'use strict';
    t.exports = n(72);
  },
  function (t, e, n) {
    'use strict';
    /** @license React v16.10.0
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ Object.defineProperty(e, '__esModule', { value: !0 });
    var r = 'function' == typeof Symbol && Symbol.for,
      i = r ? Symbol.for('react.element') : 60103,
      a = r ? Symbol.for('react.portal') : 60106,
      o = r ? Symbol.for('react.fragment') : 60107,
      l = r ? Symbol.for('react.strict_mode') : 60108,
      u = r ? Symbol.for('react.profiler') : 60114,
      s = r ? Symbol.for('react.provider') : 60109,
      c = r ? Symbol.for('react.context') : 60110,
      f = r ? Symbol.for('react.async_mode') : 60111,
      h = r ? Symbol.for('react.concurrent_mode') : 60111,
      p = r ? Symbol.for('react.forward_ref') : 60112,
      d = r ? Symbol.for('react.suspense') : 60113,
      m = r ? Symbol.for('react.suspense_list') : 60120,
      y = r ? Symbol.for('react.memo') : 60115,
      v = r ? Symbol.for('react.lazy') : 60116,
      g = r ? Symbol.for('react.fundamental') : 60117,
      _ = r ? Symbol.for('react.responder') : 60118,
      b = r ? Symbol.for('react.scope') : 60119;
    function w(t) {
      if ('object' == typeof t && null !== t) {
        var e = t.$$typeof;
        switch (e) {
          case i:
            switch ((t = t.type)) {
              case f:
              case h:
              case o:
              case u:
              case l:
              case d:
                return t;
              default:
                switch ((t = t && t.$$typeof)) {
                  case c:
                  case p:
                  case s:
                    return t;
                  default:
                    return e;
                }
            }
          case v:
          case y:
          case a:
            return e;
        }
      }
    }
    function x(t) {
      return w(t) === h;
    }
    (e.typeOf = w),
      (e.AsyncMode = f),
      (e.ConcurrentMode = h),
      (e.ContextConsumer = c),
      (e.ContextProvider = s),
      (e.Element = i),
      (e.ForwardRef = p),
      (e.Fragment = o),
      (e.Lazy = v),
      (e.Memo = y),
      (e.Portal = a),
      (e.Profiler = u),
      (e.StrictMode = l),
      (e.Suspense = d),
      (e.isValidElementType = function (t) {
        return (
          'string' == typeof t ||
          'function' == typeof t ||
          t === o ||
          t === h ||
          t === u ||
          t === l ||
          t === d ||
          t === m ||
          ('object' == typeof t &&
            null !== t &&
            (t.$$typeof === v ||
              t.$$typeof === y ||
              t.$$typeof === s ||
              t.$$typeof === c ||
              t.$$typeof === p ||
              t.$$typeof === g ||
              t.$$typeof === _ ||
              t.$$typeof === b))
        );
      }),
      (e.isAsyncMode = function (t) {
        return x(t) || w(t) === f;
      }),
      (e.isConcurrentMode = x),
      (e.isContextConsumer = function (t) {
        return w(t) === c;
      }),
      (e.isContextProvider = function (t) {
        return w(t) === s;
      }),
      (e.isElement = function (t) {
        return 'object' == typeof t && null !== t && t.$$typeof === i;
      }),
      (e.isForwardRef = function (t) {
        return w(t) === p;
      }),
      (e.isFragment = function (t) {
        return w(t) === o;
      }),
      (e.isLazy = function (t) {
        return w(t) === v;
      }),
      (e.isMemo = function (t) {
        return w(t) === y;
      }),
      (e.isPortal = function (t) {
        return w(t) === a;
      }),
      (e.isProfiler = function (t) {
        return w(t) === u;
      }),
      (e.isStrictMode = function (t) {
        return w(t) === l;
      }),
      (e.isSuspense = function (t) {
        return w(t) === d;
      });
  },
  function (t, e, n) {
    'use strict';
    n.r(e);
    var r = n(0),
      i = n.n(r),
      a = n(40),
      o = n.n(a),
      l = n(2),
      u = n.n(l),
      s = n(3),
      c = n.n(s),
      f = n(5),
      h = n.n(f),
      p = n(11),
      d = n(1),
      m = n.n(d);
    function y(t) {
      return (y =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            })(t);
    }
    function v(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function g(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {},
          r = Object.keys(n);
        'function' == typeof Object.getOwnPropertySymbols &&
          (r = r.concat(
            Object.getOwnPropertySymbols(n).filter(function (t) {
              return Object.getOwnPropertyDescriptor(n, t).enumerable;
            })
          )),
          r.forEach(function (e) {
            v(t, e, n[e]);
          });
      }
      return t;
    }
    function _(t, e) {
      if (null == t) return {};
      var n,
        r,
        i = (function (t, e) {
          if (null == t) return {};
          var n,
            r,
            i = {},
            a = Object.keys(t);
          for (r = 0; r < a.length; r++)
            (n = a[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
          return i;
        })(t, e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        for (r = 0; r < a.length; r++)
          (n = a[r]),
            e.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(t, n) &&
                (i[n] = t[n]));
      }
      return i;
    }
    function b(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            '[object Arguments]' === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance'
          );
        })()
      );
    }
    function w(t) {
      return (
        (e = t),
        (e -= 0) == e
          ? t
          : (t = t.replace(/[\-_\s]+(.)?/g, function (t, e) {
              return e ? e.toUpperCase() : '';
            }))
              .substr(0, 1)
              .toLowerCase() + t.substr(1)
      );
      var e;
    }
    var x = !1;
    try {
      x = !0;
    } catch (t) {}
    function k(t) {
      return null === t
        ? null
        : 'object' === y(t) && t.prefix && t.iconName
        ? t
        : Array.isArray(t) && 2 === t.length
        ? { prefix: t[0], iconName: t[1] }
        : 'string' == typeof t
        ? { prefix: 'fas', iconName: t }
        : void 0;
    }
    function E(t, e) {
      return (Array.isArray(e) && e.length > 0) || (!Array.isArray(e) && e)
        ? v({}, t, e)
        : {};
    }
    function T(t) {
      var e = t.icon,
        n = t.mask,
        r = t.symbol,
        i = t.className,
        a = t.title,
        o = k(e),
        l = E(
          'classes',
          [].concat(
            b(
              (function (t) {
                var e,
                  n = t.spin,
                  r = t.pulse,
                  i = t.fixedWidth,
                  a = t.inverse,
                  o = t.border,
                  l = t.listItem,
                  u = t.flip,
                  s = t.size,
                  c = t.rotation,
                  f = t.pull,
                  h =
                    (v(
                      (e = {
                        'fa-spin': n,
                        'fa-pulse': r,
                        'fa-fw': i,
                        'fa-inverse': a,
                        'fa-border': o,
                        'fa-li': l,
                        'fa-flip-horizontal':
                          'horizontal' === u || 'both' === u,
                        'fa-flip-vertical': 'vertical' === u || 'both' === u,
                      }),
                      'fa-'.concat(s),
                      void 0 !== s
                    ),
                    v(e, 'fa-rotate-'.concat(c), void 0 !== c),
                    v(e, 'fa-pull-'.concat(f), void 0 !== f),
                    v(e, 'fa-swap-opacity', t.swapOpacity),
                    e);
                return Object.keys(h)
                  .map(function (t) {
                    return h[t] ? t : null;
                  })
                  .filter(function (t) {
                    return t;
                  });
              })(t)
            ),
            b(i.split(' '))
          )
        ),
        u = E(
          'transform',
          'string' == typeof t.transform
            ? p.b.transform(t.transform)
            : t.transform
        ),
        s = E('mask', k(n)),
        c = Object(p.a)(o, g({}, l, u, s, { symbol: r, title: a }));
      if (!c)
        return (
          (function () {
            var t;
            !x &&
              console &&
              'function' == typeof console.error &&
              (t = console).error.apply(t, arguments);
          })('Could not find icon', o),
          null
        );
      var f = c.abstract,
        h = {};
      return (
        Object.keys(t).forEach(function (e) {
          T.defaultProps.hasOwnProperty(e) || (h[e] = t[e]);
        }),
        S(f[0], h)
      );
    }
    (T.displayName = 'FontAwesomeIcon'),
      (T.propTypes = {
        border: m.a.bool,
        className: m.a.string,
        mask: m.a.oneOfType([m.a.object, m.a.array, m.a.string]),
        fixedWidth: m.a.bool,
        inverse: m.a.bool,
        flip: m.a.oneOf(['horizontal', 'vertical', 'both']),
        icon: m.a.oneOfType([m.a.object, m.a.array, m.a.string]),
        listItem: m.a.bool,
        pull: m.a.oneOf(['right', 'left']),
        pulse: m.a.bool,
        rotation: m.a.oneOf([90, 180, 270]),
        size: m.a.oneOf([
          'lg',
          'xs',
          'sm',
          '1x',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x',
        ]),
        spin: m.a.bool,
        symbol: m.a.oneOfType([m.a.bool, m.a.string]),
        title: m.a.string,
        transform: m.a.oneOfType([m.a.string, m.a.object]),
        swapOpacity: m.a.bool,
      }),
      (T.defaultProps = {
        border: !1,
        className: '',
        mask: null,
        fixedWidth: !1,
        inverse: !1,
        flip: null,
        icon: null,
        listItem: !1,
        pull: null,
        pulse: !1,
        rotation: null,
        size: null,
        spin: !1,
        symbol: !1,
        title: '',
        transform: null,
        swapOpacity: !1,
      });
    var S = function t(e, n) {
        var r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if ('string' == typeof n) return n;
        var i = (n.children || []).map(function (n) {
            return t(e, n);
          }),
          a = Object.keys(n.attributes || {}).reduce(
            function (t, e) {
              var r = n.attributes[e];
              switch (e) {
                case 'class':
                  (t.attrs.className = r), delete n.attributes.class;
                  break;
                case 'style':
                  t.attrs.style = (function (t) {
                    return t
                      .split(';')
                      .map(function (t) {
                        return t.trim();
                      })
                      .filter(function (t) {
                        return t;
                      })
                      .reduce(function (t, e) {
                        var n,
                          r = e.indexOf(':'),
                          i = w(e.slice(0, r)),
                          a = e.slice(r + 1).trim();
                        return (
                          i.startsWith('webkit')
                            ? (t[
                                ((n = i),
                                n.charAt(0).toUpperCase() + n.slice(1))
                              ] = a)
                            : (t[i] = a),
                          t
                        );
                      }, {});
                  })(r);
                  break;
                default:
                  0 === e.indexOf('aria-') || 0 === e.indexOf('data-')
                    ? (t.attrs[e.toLowerCase()] = r)
                    : (t.attrs[w(e)] = r);
              }
              return t;
            },
            { attrs: {} }
          ),
          o = r.style,
          l = void 0 === o ? {} : o,
          u = _(r, ['style']);
        return (
          (a.attrs.style = g({}, a.attrs.style, l)),
          e.apply(void 0, [n.tag, g({}, a.attrs, u)].concat(b(i)))
        );
      }.bind(null, i.a.createElement),
      C = {
        prefix: 'fas',
        iconName: 'arrow-right',
        icon: [
          448,
          512,
          [],
          'f061',
          'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z',
        ],
      },
      M = {
        prefix: 'fas',
        iconName: 'sad-tear',
        icon: [
          496,
          512,
          [],
          'f5b4',
          'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM152 416c-26.5 0-48-21-48-47 0-20 28.5-60.4 41.6-77.8 3.2-4.3 9.6-4.3 12.8 0C171.5 308.6 200 349 200 369c0 26-21.5 47-48 47zm16-176c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm170.2 154.2C315.8 367.4 282.9 352 248 352c-21.2 0-21.2-32 0-32 44.4 0 86.3 19.6 114.7 53.8 13.8 16.4-11.2 36.5-24.5 20.4z',
        ],
      },
      N = function (t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
      },
      P = function (t) {
        return null === t ? NaN : +t;
      };
    function O(t, e, n) {
      return (
        (t = Float64Array.from(
          (function* (t, e) {
            if (void 0 === e)
              for (let e of t) null != e && (e = +e) >= e && (yield e);
            else {
              let n = -1;
              for (let r of t)
                null != (r = e(r, ++n, t)) && (r = +r) >= r && (yield r);
            }
          })(t, n)
        )).sort(N),
        (function (t, e, n = P) {
          if (!(r = t.length)) return;
          if ((e = +e) <= 0 || r < 2) return +n(t[0], 0, t);
          if (e >= 1) return +n(t[r - 1], r - 1, t);
          var r,
            i = (r - 1) * e,
            a = Math.floor(i),
            o = +n(t[a], a, t),
            l = +n(t[a + 1], a + 1, t);
          return o + (l - o) * (i - a);
        })(t, e)
      );
    }
    function A(t) {
      var e = t.type,
        n = Object(r.useState)(95),
        a = u()(n, 2),
        o = a[0],
        l = a[1],
        s = Object(r.useState)([]),
        f = u()(s, 2),
        p = f[0],
        d = f[1],
        m = (function () {
          var t = h()(
            c.a.mark(function t(n) {
              var r, i;
              return c.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (!window.values) {
                        t.next = 5;
                        break;
                      }
                      (i = O(window.values, n / 100, function (t) {
                        return t.x * t.y;
                      })),
                        (r = window.values.filter(function (t) {
                          return t.x * t.y > i;
                        })),
                        (t.next = 10);
                      break;
                    case 5:
                      return (
                        (t.next = 7),
                        fetch('suggestions?t='.concat(n, '&type=').concat(e))
                      );
                    case 7:
                      return (t.next = 9), t.sent.json();
                    case 9:
                      r = t.sent;
                    case 10:
                      d(r);
                    case 11:
                    case 'end':
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })();
      return (
        Object(r.useEffect)(
          function () {
            m(o);
          },
          [e]
        ),
        i.a.createElement(
          'div',
          { className: 'card' },
          i.a.createElement(
            'div',
            { className: 'card-body' },
            i.a.createElement(
              'div',
              { className: 'd-flex justify-content-between' },
              i.a.createElement(
                'div',
                null,
                i.a.createElement(
                  'h5',
                  { className: 'card-title' },
                  'Refactoring Candidates'
                ),
                i.a.createElement(
                  'h6',
                  { className: 'card-subtitle text-muted' },
                  'Top 95 Percentile of Churn * Complexity'
                )
              ),
              i.a.createElement(
                'div',
                { id: 'percentile-input-group' },
                i.a.createElement(
                  'label',
                  { htmlFor: 'percentile', className: 'text-muted' },
                  i.a.createElement('small', null, 'Percentile')
                ),
                i.a.createElement(
                  'div',
                  { className: 'input-group align-items-start' },
                  i.a.createElement('input', {
                    type: 'text',
                    className: 'form-control',
                    placeholder: '',
                    'aria-label': '',
                    'aria-describedby': 'percentile-button',
                    id: 'percentile',
                    value: o,
                    onChange: function (t) {
                      return l(t.target.value);
                    },
                  }),
                  i.a.createElement(
                    'div',
                    { className: 'input-group-append' },
                    i.a.createElement(
                      'button',
                      {
                        className: 'btn btn-dark',
                        type: 'button',
                        id: 'percentile-button',
                        onClick: function (t) {
                          t.preventDefault(), m(o);
                        },
                      },
                      i.a.createElement(T, { icon: C })
                    )
                  )
                )
              )
            ),
            i.a.createElement(
              'table',
              { className: 'table mt-4' },
              i.a.createElement(
                'thead',
                null,
                i.a.createElement(
                  'tr',
                  null,
                  i.a.createElement('th', { scope: 'col' }, 'File Path'),
                  i.a.createElement('th', { scope: 'col' }, 'Churn'),
                  i.a.createElement('th', { scope: 'col' }, 'Complexity'),
                  i.a.createElement(
                    'th',
                    { scope: 'col' },
                    'Churn * Complexity'
                  )
                )
              ),
              i.a.createElement(
                'tbody',
                { id: 'suggestions-table' },
                p.length > 0 &&
                  p.map(function (t) {
                    return i.a.createElement(
                      'tr',
                      { key: t.file_path },
                      i.a.createElement('td', null, t.file_path),
                      i.a.createElement('td', null, t.x),
                      i.a.createElement('td', null, Math.round(t.y)),
                      i.a.createElement('td', null, Math.round(t.x * t.y))
                    );
                  })
              )
            )
          )
        )
      );
    }
    var L = n(8),
      R = n.n(L),
      F = function (t) {
        var e = t.activeFile,
          n = t.handleClose;
        return i.a.createElement(
          'div',
          { className: 'col-4' },
          i.a.createElement(
            'div',
            { className: 'card' },
            i.a.createElement(
              'div',
              { className: 'card-header' },
              i.a.createElement('h5', { className: 'card-title' }, e.file_path),
              i.a.createElement(
                'h6',
                { className: 'text-muted' },
                'Additional information'
              ),
              i.a.createElement(
                'button',
                {
                  type: 'button',
                  className: 'close',
                  'aria-label': 'Close',
                  onClick: n,
                },
                i.a.createElement('span', { 'aria-hidden': 'true' }, '×')
              )
            ),
            i.a.createElement(
              'div',
              { className: 'card-body' },
              i.a.createElement(
                'h6',
                { className: 'text-muted' },
                i.a.createElement('strong', null, 'Method Teardown')
              ),
              i.a.createElement(
                'table',
                { className: 'table table-borderless mt-0 method-table' },
                i.a.createElement(
                  'tbody',
                  null,
                  Object.entries(e.details).map(function (t) {
                    var e = u()(t, 2),
                      n = e[0],
                      r = e[1];
                    return i.a.createElement(
                      'tr',
                      { className: 'row', key: n },
                      i.a.createElement(
                        'td',
                        { className: 'px-3 py-1 col-9 text-truncate' },
                        n
                      ),
                      i.a.createElement(
                        'td',
                        { className: 'px-3 py-1 col-3' },
                        Math.round(100 * r) / 100
                      )
                    );
                  })
                )
              ),
              i.a.createElement(
                'h6',
                { className: 'text-muted mt-3' },
                'Git history (last 10 commits)'
              ),
              i.a.createElement(
                'table',
                { className: 'table table-borderless mt-0 method-table' },
                i.a.createElement(
                  'tbody',
                  null,
                  e.history.map(function (t) {
                    var e = u()(t, 2),
                      n = e[0],
                      r = e[1];
                    return i.a.createElement(
                      'tr',
                      { className: 'row', key: n },
                      i.a.createElement(
                        'td',
                        { className: 'px-3 py-1 col-3 text-truncate' },
                        n
                      ),
                      i.a.createElement(
                        'td',
                        { className: 'px-3 py-1 col-8 text-truncate' },
                        r
                      )
                    );
                  })
                )
              )
            )
          )
        );
      },
      z = function (t) {
        var e = t.state,
          n = t.dispatch,
          r = t.activePlot;
        return i.a.createElement(
          'div',
          { className: 'mt-3' },
          i.a.createElement(
            'h6',
            { className: 'text-muted' },
            i.a.createElement('strong', null, 'Display options')
          ),
          i.a.createElement(
            'form',
            null,
            i.a.createElement(
              'div',
              { className: 'form-row' },
              i.a.createElement(
                'div',
                { className: 'form-group col-2' },
                i.a.createElement('input', {
                  checked: e.displayFilenames,
                  className: 'form-check-input',
                  type: 'checkbox',
                  id: 'filenames-check',
                  onChange: function () {
                    n({
                      type: 'SET_DISPLAY_FILENAMES',
                      displayFilenames: !e.displayFilenames,
                    });
                  },
                }),
                i.a.createElement(
                  'label',
                  {
                    className: 'form-check-label text-muted',
                    htmlFor: 'filenames-check',
                  },
                  i.a.createElement('small', null, 'Display filenames')
                )
              ),
              i.a.createElement(
                'div',
                { className: 'form-group col-2' },
                i.a.createElement('input', {
                  checked: e.displayRegression,
                  className: 'form-check-input',
                  type: 'checkbox',
                  id: 'regression-check',
                  disabled: r !== jf.SCATTER_PLOT,
                  onChange: function () {
                    n({
                      type: 'SET_DISPLAY_REGRESSION',
                      displayRegression: !e.displayRegression,
                    });
                  },
                }),
                i.a.createElement(
                  'label',
                  {
                    className: 'form-check-label text-muted',
                    htmlFor: 'regression-check',
                  },
                  i.a.createElement('small', null, 'Display regression')
                )
              ),
              i.a.createElement(
                'div',
                { className: 'form-group col-3' },
                i.a.createElement(
                  'label',
                  {
                    htmlFor: 'regression-type',
                    className: 'text-muted '.concat(
                      r === jf.TREE_MAP && 'disabled'
                    ),
                  },
                  i.a.createElement('small', null, 'Regression Type')
                ),
                i.a.createElement(
                  'select',
                  {
                    id: 'regression-type',
                    className: 'form-control',
                    disabled: r !== jf.SCATTER_PLOT,
                    onChange: function (t) {
                      n({
                        type: 'SET_REGRESSION_TYPE',
                        regressionType: parseInt(t.currentTarget.value),
                      });
                    },
                  },
                  i.a.createElement(
                    'option',
                    { selected: !0, value: '0' },
                    'Power Law'
                  ),
                  i.a.createElement('option', { value: '1' }, 'Linear')
                )
              )
            )
          )
        );
      },
      I = function (t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
      };
    var j,
      U,
      D =
        (1 === (j = I).length &&
          ((U = j),
          (j = function (t, e) {
            return I(U(t), e);
          })),
        {
          left: function (t, e, n, r) {
            for (null == n && (n = 0), null == r && (r = t.length); n < r; ) {
              var i = (n + r) >>> 1;
              j(t[i], e) < 0 ? (n = i + 1) : (r = i);
            }
            return n;
          },
          right: function (t, e, n, r) {
            for (null == n && (n = 0), null == r && (r = t.length); n < r; ) {
              var i = (n + r) >>> 1;
              j(t[i], e) > 0 ? (r = i) : (n = i + 1);
            }
            return n;
          },
        }),
      H = D.right;
    var W = function (t, e) {
        var n,
          r,
          i,
          a = t.length,
          o = -1;
        if (null == e) {
          for (; ++o < a; )
            if (null != (n = t[o]) && n >= n)
              for (r = i = n; ++o < a; )
                null != (n = t[o]) && (r > n && (r = n), i < n && (i = n));
        } else
          for (; ++o < a; )
            if (null != (n = e(t[o], o, t)) && n >= n)
              for (r = i = n; ++o < a; )
                null != (n = e(t[o], o, t)) &&
                  (r > n && (r = n), i < n && (i = n));
        return [r, i];
      },
      $ = Array.prototype,
      Y = $.slice,
      B =
        ($.map,
        function (t) {
          return function () {
            return t;
          };
        }),
      q = function (t) {
        return t;
      },
      V = function (t, e, n) {
        (t = +t),
          (e = +e),
          (n =
            (i = arguments.length) < 2
              ? ((e = t), (t = 0), 1)
              : i < 3
              ? 1
              : +n);
        for (
          var r = -1,
            i = 0 | Math.max(0, Math.ceil((e - t) / n)),
            a = new Array(i);
          ++r < i;

        )
          a[r] = t + r * n;
        return a;
      },
      X = Math.sqrt(50),
      Q = Math.sqrt(10),
      K = Math.sqrt(2);
    var G = function (t) {
        return Math.ceil(Math.log(t.length) / Math.LN2) + 1;
      },
      Z = function () {
        var t = q,
          e = W,
          n = G;
        function r(r) {
          var i,
            a,
            o = r.length,
            l = new Array(o);
          for (i = 0; i < o; ++i) l[i] = t(r[i], i, r);
          var u,
            s,
            c,
            f,
            h,
            p,
            d = e(l),
            m = d[0],
            y = d[1],
            v = n(l, m, y);
          Array.isArray(v) ||
            ((u = m),
            (s = y),
            (c = v),
            (f = Math.abs(s - u) / Math.max(0, c)),
            (h = Math.pow(10, Math.floor(Math.log(f) / Math.LN10))),
            (p = f / h) >= X
              ? (h *= 10)
              : p >= Q
              ? (h *= 5)
              : p >= K && (h *= 2),
            (v = s < u ? -h : h),
            (v = V(Math.ceil(m / v) * v, y, v)));
          for (var g = v.length; v[0] <= m; ) v.shift(), --g;
          for (; v[g - 1] > y; ) v.pop(), --g;
          var _,
            b = new Array(g + 1);
          for (i = 0; i <= g; ++i)
            ((_ = b[i] = []).x0 = i > 0 ? v[i - 1] : m),
              (_.x1 = i < g ? v[i] : y);
          for (i = 0; i < o; ++i)
            m <= (a = l[i]) && a <= y && b[H(v, a, 0, g)].push(r[i]);
          return b;
        }
        return (
          (r.value = function (e) {
            return arguments.length
              ? ((t = 'function' == typeof e ? e : B(e)), r)
              : t;
          }),
          (r.domain = function (t) {
            return arguments.length
              ? ((e = 'function' == typeof t ? t : B([t[0], t[1]])), r)
              : e;
          }),
          (r.thresholds = function (t) {
            return arguments.length
              ? ((n =
                  'function' == typeof t
                    ? t
                    : Array.isArray(t)
                    ? B(Y.call(t))
                    : B(t)),
                r)
              : n;
          }),
          r
        );
      },
      J = function (t, e) {
        var n,
          r,
          i = t.length,
          a = -1;
        if (null == e) {
          for (; ++a < i; )
            if (null != (n = t[a]) && n >= n)
              for (r = n; ++a < i; ) null != (n = t[a]) && n > r && (r = n);
        } else
          for (; ++a < i; )
            if (null != (n = e(t[a], a, t)) && n >= n)
              for (r = n; ++a < i; )
                null != (n = e(t[a], a, t)) && n > r && (r = n);
        return r;
      };
    var tt = Array.prototype.slice,
      et = function (t) {
        return t;
      },
      nt = 1,
      rt = 2,
      it = 3,
      at = 4,
      ot = 1e-6;
    function lt(t) {
      return 'translate(' + (t + 0.5) + ',0)';
    }
    function ut(t) {
      return 'translate(0,' + (t + 0.5) + ')';
    }
    function st(t) {
      return function (e) {
        return +t(e);
      };
    }
    function ct(t) {
      var e = Math.max(0, t.bandwidth() - 1) / 2;
      return (
        t.round() && (e = Math.round(e)),
        function (n) {
          return +t(n) + e;
        }
      );
    }
    function ft() {
      return !this.__axis;
    }
    function ht(t, e) {
      var n = [],
        r = null,
        i = null,
        a = 6,
        o = 6,
        l = 3,
        u = t === nt || t === at ? -1 : 1,
        s = t === at || t === rt ? 'x' : 'y',
        c = t === nt || t === it ? lt : ut;
      function f(f) {
        var h = null == r ? (e.ticks ? e.ticks.apply(e, n) : e.domain()) : r,
          p = null == i ? (e.tickFormat ? e.tickFormat.apply(e, n) : et) : i,
          d = Math.max(a, 0) + l,
          m = e.range(),
          y = +m[0] + 0.5,
          v = +m[m.length - 1] + 0.5,
          g = (e.bandwidth ? ct : st)(e.copy()),
          _ = f.selection ? f.selection() : f,
          b = _.selectAll('.domain').data([null]),
          w = _.selectAll('.tick').data(h, e).order(),
          x = w.exit(),
          k = w.enter().append('g').attr('class', 'tick'),
          E = w.select('line'),
          T = w.select('text');
        (b = b.merge(
          b
            .enter()
            .insert('path', '.tick')
            .attr('class', 'domain')
            .attr('stroke', 'currentColor')
        )),
          (w = w.merge(k)),
          (E = E.merge(
            k
              .append('line')
              .attr('stroke', 'currentColor')
              .attr(s + '2', u * a)
          )),
          (T = T.merge(
            k
              .append('text')
              .attr('fill', 'currentColor')
              .attr(s, u * d)
              .attr('dy', t === nt ? '0em' : t === it ? '0.71em' : '0.32em')
          )),
          f !== _ &&
            ((b = b.transition(f)),
            (w = w.transition(f)),
            (E = E.transition(f)),
            (T = T.transition(f)),
            (x = x
              .transition(f)
              .attr('opacity', ot)
              .attr('transform', function (t) {
                return isFinite((t = g(t)))
                  ? c(t)
                  : this.getAttribute('transform');
              })),
            k.attr('opacity', ot).attr('transform', function (t) {
              var e = this.parentNode.__axis;
              return c(e && isFinite((e = e(t))) ? e : g(t));
            })),
          x.remove(),
          b.attr(
            'd',
            t === at || t == rt
              ? o
                ? 'M' + u * o + ',' + y + 'H0.5V' + v + 'H' + u * o
                : 'M0.5,' + y + 'V' + v
              : o
              ? 'M' + y + ',' + u * o + 'V0.5H' + v + 'V' + u * o
              : 'M' + y + ',0.5H' + v
          ),
          w.attr('opacity', 1).attr('transform', function (t) {
            return c(g(t));
          }),
          E.attr(s + '2', u * a),
          T.attr(s, u * d).text(p),
          _.filter(ft)
            .attr('fill', 'none')
            .attr('font-size', 10)
            .attr('font-family', 'sans-serif')
            .attr(
              'text-anchor',
              t === rt ? 'start' : t === at ? 'end' : 'middle'
            ),
          _.each(function () {
            this.__axis = g;
          });
      }
      return (
        (f.scale = function (t) {
          return arguments.length ? ((e = t), f) : e;
        }),
        (f.ticks = function () {
          return (n = tt.call(arguments)), f;
        }),
        (f.tickArguments = function (t) {
          return arguments.length
            ? ((n = null == t ? [] : tt.call(t)), f)
            : n.slice();
        }),
        (f.tickValues = function (t) {
          return arguments.length
            ? ((r = null == t ? null : tt.call(t)), f)
            : r && r.slice();
        }),
        (f.tickFormat = function (t) {
          return arguments.length ? ((i = t), f) : i;
        }),
        (f.tickSize = function (t) {
          return arguments.length ? ((a = o = +t), f) : a;
        }),
        (f.tickSizeInner = function (t) {
          return arguments.length ? ((a = +t), f) : a;
        }),
        (f.tickSizeOuter = function (t) {
          return arguments.length ? ((o = +t), f) : o;
        }),
        (f.tickPadding = function (t) {
          return arguments.length ? ((l = +t), f) : l;
        }),
        f
      );
    }
    function pt(t) {
      return ht(it, t);
    }
    function dt(t) {
      return ht(at, t);
    }
    var mt = { value: function () {} };
    function yt() {
      for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
        if (!(t = arguments[e] + '') || t in r)
          throw new Error('illegal type: ' + t);
        r[t] = [];
      }
      return new vt(r);
    }
    function vt(t) {
      this._ = t;
    }
    function gt(t, e) {
      return t
        .trim()
        .split(/^|\s+/)
        .map(function (t) {
          var n = '',
            r = t.indexOf('.');
          if (
            (r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))),
            t && !e.hasOwnProperty(t))
          )
            throw new Error('unknown type: ' + t);
          return { type: t, name: n };
        });
    }
    function _t(t, e) {
      for (var n, r = 0, i = t.length; r < i; ++r)
        if ((n = t[r]).name === e) return n.value;
    }
    function bt(t, e, n) {
      for (var r = 0, i = t.length; r < i; ++r)
        if (t[r].name === e) {
          (t[r] = mt), (t = t.slice(0, r).concat(t.slice(r + 1)));
          break;
        }
      return null != n && t.push({ name: e, value: n }), t;
    }
    vt.prototype = yt.prototype = {
      constructor: vt,
      on: function (t, e) {
        var n,
          r = this._,
          i = gt(t + '', r),
          a = -1,
          o = i.length;
        if (!(arguments.length < 2)) {
          if (null != e && 'function' != typeof e)
            throw new Error('invalid callback: ' + e);
          for (; ++a < o; )
            if ((n = (t = i[a]).type)) r[n] = bt(r[n], t.name, e);
            else if (null == e) for (n in r) r[n] = bt(r[n], t.name, null);
          return this;
        }
        for (; ++a < o; )
          if ((n = (t = i[a]).type) && (n = _t(r[n], t.name))) return n;
      },
      copy: function () {
        var t = {},
          e = this._;
        for (var n in e) t[n] = e[n].slice();
        return new vt(t);
      },
      call: function (t, e) {
        if ((n = arguments.length - 2) > 0)
          for (var n, r, i = new Array(n), a = 0; a < n; ++a)
            i[a] = arguments[a + 2];
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (a = 0, n = (r = this._[t]).length; a < n; ++a)
          r[a].value.apply(e, i);
      },
      apply: function (t, e, n) {
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
          r[i].value.apply(e, n);
      },
    };
    var wt = yt,
      xt = 'http://www.w3.org/1999/xhtml',
      kt = {
        svg: 'http://www.w3.org/2000/svg',
        xhtml: xt,
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/',
      },
      Et = function (t) {
        var e = (t += ''),
          n = e.indexOf(':');
        return (
          n >= 0 && 'xmlns' !== (e = t.slice(0, n)) && (t = t.slice(n + 1)),
          kt.hasOwnProperty(e) ? { space: kt[e], local: t } : t
        );
      };
    function Tt(t) {
      return function () {
        var e = this.ownerDocument,
          n = this.namespaceURI;
        return n === xt && e.documentElement.namespaceURI === xt
          ? e.createElement(t)
          : e.createElementNS(n, t);
      };
    }
    function St(t) {
      return function () {
        return this.ownerDocument.createElementNS(t.space, t.local);
      };
    }
    var Ct = function (t) {
      var e = Et(t);
      return (e.local ? St : Tt)(e);
    };
    function Mt() {}
    var Nt = function (t) {
      return null == t
        ? Mt
        : function () {
            return this.querySelector(t);
          };
    };
    function Pt() {
      return [];
    }
    var Ot = function (t) {
        return null == t
          ? Pt
          : function () {
              return this.querySelectorAll(t);
            };
      },
      At = function (t) {
        return function () {
          return this.matches(t);
        };
      },
      Lt = function (t) {
        return new Array(t.length);
      };
    function Rt(t, e) {
      (this.ownerDocument = t.ownerDocument),
        (this.namespaceURI = t.namespaceURI),
        (this._next = null),
        (this._parent = t),
        (this.__data__ = e);
    }
    Rt.prototype = {
      constructor: Rt,
      appendChild: function (t) {
        return this._parent.insertBefore(t, this._next);
      },
      insertBefore: function (t, e) {
        return this._parent.insertBefore(t, e);
      },
      querySelector: function (t) {
        return this._parent.querySelector(t);
      },
      querySelectorAll: function (t) {
        return this._parent.querySelectorAll(t);
      },
    };
    var Ft = '$';
    function zt(t, e, n, r, i, a) {
      for (var o, l = 0, u = e.length, s = a.length; l < s; ++l)
        (o = e[l])
          ? ((o.__data__ = a[l]), (r[l] = o))
          : (n[l] = new Rt(t, a[l]));
      for (; l < u; ++l) (o = e[l]) && (i[l] = o);
    }
    function It(t, e, n, r, i, a, o) {
      var l,
        u,
        s,
        c = {},
        f = e.length,
        h = a.length,
        p = new Array(f);
      for (l = 0; l < f; ++l)
        (u = e[l]) &&
          ((p[l] = s = Ft + o.call(u, u.__data__, l, e)),
          s in c ? (i[l] = u) : (c[s] = u));
      for (l = 0; l < h; ++l)
        (u = c[(s = Ft + o.call(t, a[l], l, a))])
          ? ((r[l] = u), (u.__data__ = a[l]), (c[s] = null))
          : (n[l] = new Rt(t, a[l]));
      for (l = 0; l < f; ++l) (u = e[l]) && c[p[l]] === u && (i[l] = u);
    }
    function jt(t, e) {
      return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
    }
    function Ut(t) {
      return function () {
        this.removeAttribute(t);
      };
    }
    function Dt(t) {
      return function () {
        this.removeAttributeNS(t.space, t.local);
      };
    }
    function Ht(t, e) {
      return function () {
        this.setAttribute(t, e);
      };
    }
    function Wt(t, e) {
      return function () {
        this.setAttributeNS(t.space, t.local, e);
      };
    }
    function $t(t, e) {
      return function () {
        var n = e.apply(this, arguments);
        null == n ? this.removeAttribute(t) : this.setAttribute(t, n);
      };
    }
    function Yt(t, e) {
      return function () {
        var n = e.apply(this, arguments);
        null == n
          ? this.removeAttributeNS(t.space, t.local)
          : this.setAttributeNS(t.space, t.local, n);
      };
    }
    var Bt = function (t) {
      return (
        (t.ownerDocument && t.ownerDocument.defaultView) ||
        (t.document && t) ||
        t.defaultView
      );
    };
    function qt(t) {
      return function () {
        this.style.removeProperty(t);
      };
    }
    function Vt(t, e, n) {
      return function () {
        this.style.setProperty(t, e, n);
      };
    }
    function Xt(t, e, n) {
      return function () {
        var r = e.apply(this, arguments);
        null == r
          ? this.style.removeProperty(t)
          : this.style.setProperty(t, r, n);
      };
    }
    function Qt(t, e) {
      return (
        t.style.getPropertyValue(e) ||
        Bt(t).getComputedStyle(t, null).getPropertyValue(e)
      );
    }
    function Kt(t) {
      return function () {
        delete this[t];
      };
    }
    function Gt(t, e) {
      return function () {
        this[t] = e;
      };
    }
    function Zt(t, e) {
      return function () {
        var n = e.apply(this, arguments);
        null == n ? delete this[t] : (this[t] = n);
      };
    }
    function Jt(t) {
      return t.trim().split(/^|\s+/);
    }
    function te(t) {
      return t.classList || new ee(t);
    }
    function ee(t) {
      (this._node = t), (this._names = Jt(t.getAttribute('class') || ''));
    }
    function ne(t, e) {
      for (var n = te(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
    }
    function re(t, e) {
      for (var n = te(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
    }
    function ie(t) {
      return function () {
        ne(this, t);
      };
    }
    function ae(t) {
      return function () {
        re(this, t);
      };
    }
    function oe(t, e) {
      return function () {
        (e.apply(this, arguments) ? ne : re)(this, t);
      };
    }
    ee.prototype = {
      add: function (t) {
        this._names.indexOf(t) < 0 &&
          (this._names.push(t),
          this._node.setAttribute('class', this._names.join(' ')));
      },
      remove: function (t) {
        var e = this._names.indexOf(t);
        e >= 0 &&
          (this._names.splice(e, 1),
          this._node.setAttribute('class', this._names.join(' ')));
      },
      contains: function (t) {
        return this._names.indexOf(t) >= 0;
      },
    };
    function le() {
      this.textContent = '';
    }
    function ue(t) {
      return function () {
        this.textContent = t;
      };
    }
    function se(t) {
      return function () {
        var e = t.apply(this, arguments);
        this.textContent = null == e ? '' : e;
      };
    }
    function ce() {
      this.innerHTML = '';
    }
    function fe(t) {
      return function () {
        this.innerHTML = t;
      };
    }
    function he(t) {
      return function () {
        var e = t.apply(this, arguments);
        this.innerHTML = null == e ? '' : e;
      };
    }
    function pe() {
      this.nextSibling && this.parentNode.appendChild(this);
    }
    function de() {
      this.previousSibling &&
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }
    function me() {
      return null;
    }
    function ye() {
      var t = this.parentNode;
      t && t.removeChild(this);
    }
    function ve() {
      return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
    }
    function ge() {
      return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
    }
    var _e = {},
      be = null;
    'undefined' != typeof document &&
      ('onmouseenter' in document.documentElement ||
        (_e = { mouseenter: 'mouseover', mouseleave: 'mouseout' }));
    function we(t, e, n) {
      return (
        (t = xe(t, e, n)),
        function (e) {
          var n = e.relatedTarget;
          (n && (n === this || 8 & n.compareDocumentPosition(this))) ||
            t.call(this, e);
        }
      );
    }
    function xe(t, e, n) {
      return function (r) {
        var i = be;
        be = r;
        try {
          t.call(this, this.__data__, e, n);
        } finally {
          be = i;
        }
      };
    }
    function ke(t) {
      return t
        .trim()
        .split(/^|\s+/)
        .map(function (t) {
          var e = '',
            n = t.indexOf('.');
          return (
            n >= 0 && ((e = t.slice(n + 1)), (t = t.slice(0, n))),
            { type: t, name: e }
          );
        });
    }
    function Ee(t) {
      return function () {
        var e = this.__on;
        if (e) {
          for (var n, r = 0, i = -1, a = e.length; r < a; ++r)
            (n = e[r]),
              (t.type && n.type !== t.type) || n.name !== t.name
                ? (e[++i] = n)
                : this.removeEventListener(n.type, n.listener, n.capture);
          ++i ? (e.length = i) : delete this.__on;
        }
      };
    }
    function Te(t, e, n) {
      var r = _e.hasOwnProperty(t.type) ? we : xe;
      return function (i, a, o) {
        var l,
          u = this.__on,
          s = r(e, a, o);
        if (u)
          for (var c = 0, f = u.length; c < f; ++c)
            if ((l = u[c]).type === t.type && l.name === t.name)
              return (
                this.removeEventListener(l.type, l.listener, l.capture),
                this.addEventListener(
                  l.type,
                  (l.listener = s),
                  (l.capture = n)
                ),
                void (l.value = e)
              );
        this.addEventListener(t.type, s, n),
          (l = {
            type: t.type,
            name: t.name,
            value: e,
            listener: s,
            capture: n,
          }),
          u ? u.push(l) : (this.__on = [l]);
      };
    }
    function Se(t, e, n) {
      var r = Bt(t),
        i = r.CustomEvent;
      'function' == typeof i
        ? (i = new i(e, n))
        : ((i = r.document.createEvent('Event')),
          n
            ? (i.initEvent(e, n.bubbles, n.cancelable), (i.detail = n.detail))
            : i.initEvent(e, !1, !1)),
        t.dispatchEvent(i);
    }
    function Ce(t, e) {
      return function () {
        return Se(this, t, e);
      };
    }
    function Me(t, e) {
      return function () {
        return Se(this, t, e.apply(this, arguments));
      };
    }
    var Ne = [null];
    function Pe(t, e) {
      (this._groups = t), (this._parents = e);
    }
    function Oe() {
      return new Pe([[document.documentElement]], Ne);
    }
    Pe.prototype = Oe.prototype = {
      constructor: Pe,
      select: function (t) {
        'function' != typeof t && (t = Nt(t));
        for (
          var e = this._groups, n = e.length, r = new Array(n), i = 0;
          i < n;
          ++i
        )
          for (
            var a, o, l = e[i], u = l.length, s = (r[i] = new Array(u)), c = 0;
            c < u;
            ++c
          )
            (a = l[c]) &&
              (o = t.call(a, a.__data__, c, l)) &&
              ('__data__' in a && (o.__data__ = a.__data__), (s[c] = o));
        return new Pe(r, this._parents);
      },
      selectAll: function (t) {
        'function' != typeof t && (t = Ot(t));
        for (
          var e = this._groups, n = e.length, r = [], i = [], a = 0;
          a < n;
          ++a
        )
          for (var o, l = e[a], u = l.length, s = 0; s < u; ++s)
            (o = l[s]) && (r.push(t.call(o, o.__data__, s, l)), i.push(o));
        return new Pe(r, i);
      },
      filter: function (t) {
        'function' != typeof t && (t = At(t));
        for (
          var e = this._groups, n = e.length, r = new Array(n), i = 0;
          i < n;
          ++i
        )
          for (
            var a, o = e[i], l = o.length, u = (r[i] = []), s = 0;
            s < l;
            ++s
          )
            (a = o[s]) && t.call(a, a.__data__, s, o) && u.push(a);
        return new Pe(r, this._parents);
      },
      data: function (t, e) {
        if (!t)
          return (
            (d = new Array(this.size())),
            (c = -1),
            this.each(function (t) {
              d[++c] = t;
            }),
            d
          );
        var n,
          r = e ? It : zt,
          i = this._parents,
          a = this._groups;
        'function' != typeof t &&
          ((n = t),
          (t = function () {
            return n;
          }));
        for (
          var o = a.length,
            l = new Array(o),
            u = new Array(o),
            s = new Array(o),
            c = 0;
          c < o;
          ++c
        ) {
          var f = i[c],
            h = a[c],
            p = h.length,
            d = t.call(f, f && f.__data__, c, i),
            m = d.length,
            y = (u[c] = new Array(m)),
            v = (l[c] = new Array(m));
          r(f, h, y, v, (s[c] = new Array(p)), d, e);
          for (var g, _, b = 0, w = 0; b < m; ++b)
            if ((g = y[b])) {
              for (b >= w && (w = b + 1); !(_ = v[w]) && ++w < m; );
              g._next = _ || null;
            }
        }
        return ((l = new Pe(l, i))._enter = u), (l._exit = s), l;
      },
      enter: function () {
        return new Pe(this._enter || this._groups.map(Lt), this._parents);
      },
      exit: function () {
        return new Pe(this._exit || this._groups.map(Lt), this._parents);
      },
      join: function (t, e, n) {
        var r = this.enter(),
          i = this,
          a = this.exit();
        return (
          (r = 'function' == typeof t ? t(r) : r.append(t + '')),
          null != e && (i = e(i)),
          null == n ? a.remove() : n(a),
          r && i ? r.merge(i).order() : i
        );
      },
      merge: function (t) {
        for (
          var e = this._groups,
            n = t._groups,
            r = e.length,
            i = n.length,
            a = Math.min(r, i),
            o = new Array(r),
            l = 0;
          l < a;
          ++l
        )
          for (
            var u,
              s = e[l],
              c = n[l],
              f = s.length,
              h = (o[l] = new Array(f)),
              p = 0;
            p < f;
            ++p
          )
            (u = s[p] || c[p]) && (h[p] = u);
        for (; l < r; ++l) o[l] = e[l];
        return new Pe(o, this._parents);
      },
      order: function () {
        for (var t = this._groups, e = -1, n = t.length; ++e < n; )
          for (var r, i = t[e], a = i.length - 1, o = i[a]; --a >= 0; )
            (r = i[a]) &&
              (o &&
                4 ^ r.compareDocumentPosition(o) &&
                o.parentNode.insertBefore(r, o),
              (o = r));
        return this;
      },
      sort: function (t) {
        function e(e, n) {
          return e && n ? t(e.__data__, n.__data__) : !e - !n;
        }
        t || (t = jt);
        for (
          var n = this._groups, r = n.length, i = new Array(r), a = 0;
          a < r;
          ++a
        ) {
          for (
            var o, l = n[a], u = l.length, s = (i[a] = new Array(u)), c = 0;
            c < u;
            ++c
          )
            (o = l[c]) && (s[c] = o);
          s.sort(e);
        }
        return new Pe(i, this._parents).order();
      },
      call: function () {
        var t = arguments[0];
        return (arguments[0] = this), t.apply(null, arguments), this;
      },
      nodes: function () {
        var t = new Array(this.size()),
          e = -1;
        return (
          this.each(function () {
            t[++e] = this;
          }),
          t
        );
      },
      node: function () {
        for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
          for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
            var o = r[i];
            if (o) return o;
          }
        return null;
      },
      size: function () {
        var t = 0;
        return (
          this.each(function () {
            ++t;
          }),
          t
        );
      },
      empty: function () {
        return !this.node();
      },
      each: function (t) {
        for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
          for (var i, a = e[n], o = 0, l = a.length; o < l; ++o)
            (i = a[o]) && t.call(i, i.__data__, o, a);
        return this;
      },
      attr: function (t, e) {
        var n = Et(t);
        if (arguments.length < 2) {
          var r = this.node();
          return n.local
            ? r.getAttributeNS(n.space, n.local)
            : r.getAttribute(n);
        }
        return this.each(
          (null == e
            ? n.local
              ? Dt
              : Ut
            : 'function' == typeof e
            ? n.local
              ? Yt
              : $t
            : n.local
            ? Wt
            : Ht)(n, e)
        );
      },
      style: function (t, e, n) {
        return arguments.length > 1
          ? this.each(
              (null == e ? qt : 'function' == typeof e ? Xt : Vt)(
                t,
                e,
                null == n ? '' : n
              )
            )
          : Qt(this.node(), t);
      },
      property: function (t, e) {
        return arguments.length > 1
          ? this.each((null == e ? Kt : 'function' == typeof e ? Zt : Gt)(t, e))
          : this.node()[t];
      },
      classed: function (t, e) {
        var n = Jt(t + '');
        if (arguments.length < 2) {
          for (var r = te(this.node()), i = -1, a = n.length; ++i < a; )
            if (!r.contains(n[i])) return !1;
          return !0;
        }
        return this.each(('function' == typeof e ? oe : e ? ie : ae)(n, e));
      },
      text: function (t) {
        return arguments.length
          ? this.each(null == t ? le : ('function' == typeof t ? se : ue)(t))
          : this.node().textContent;
      },
      html: function (t) {
        return arguments.length
          ? this.each(null == t ? ce : ('function' == typeof t ? he : fe)(t))
          : this.node().innerHTML;
      },
      raise: function () {
        return this.each(pe);
      },
      lower: function () {
        return this.each(de);
      },
      append: function (t) {
        var e = 'function' == typeof t ? t : Ct(t);
        return this.select(function () {
          return this.appendChild(e.apply(this, arguments));
        });
      },
      insert: function (t, e) {
        var n = 'function' == typeof t ? t : Ct(t),
          r = null == e ? me : 'function' == typeof e ? e : Nt(e);
        return this.select(function () {
          return this.insertBefore(
            n.apply(this, arguments),
            r.apply(this, arguments) || null
          );
        });
      },
      remove: function () {
        return this.each(ye);
      },
      clone: function (t) {
        return this.select(t ? ge : ve);
      },
      datum: function (t) {
        return arguments.length
          ? this.property('__data__', t)
          : this.node().__data__;
      },
      on: function (t, e, n) {
        var r,
          i,
          a = ke(t + ''),
          o = a.length;
        if (!(arguments.length < 2)) {
          for (l = e ? Te : Ee, null == n && (n = !1), r = 0; r < o; ++r)
            this.each(l(a[r], e, n));
          return this;
        }
        var l = this.node().__on;
        if (l)
          for (var u, s = 0, c = l.length; s < c; ++s)
            for (r = 0, u = l[s]; r < o; ++r)
              if ((i = a[r]).type === u.type && i.name === u.name)
                return u.value;
      },
      dispatch: function (t, e) {
        return this.each(('function' == typeof e ? Me : Ce)(t, e));
      },
    };
    var Ae = Oe,
      Le = function (t) {
        return 'string' == typeof t
          ? new Pe([[document.querySelector(t)]], [document.documentElement])
          : new Pe([[t]], Ne);
      },
      Re = 0;
    function Fe() {
      this._ = '@' + (++Re).toString(36);
    }
    Fe.prototype = function () {
      return new Fe();
    }.prototype = {
      constructor: Fe,
      get: function (t) {
        for (var e = this._; !(e in t); ) if (!(t = t.parentNode)) return;
        return t[e];
      },
      set: function (t, e) {
        return (t[this._] = e);
      },
      remove: function (t) {
        return this._ in t && delete t[this._];
      },
      toString: function () {
        return this._;
      },
    };
    function ze(t, e, n, r, i, a, o, l, u, s) {
      (this.target = t),
        (this.type = e),
        (this.subject = n),
        (this.identifier = r),
        (this.active = i),
        (this.x = a),
        (this.y = o),
        (this.dx = l),
        (this.dy = u),
        (this._ = s);
    }
    ze.prototype.on = function () {
      var t = this._.on.apply(this._, arguments);
      return t === this._ ? this : t;
    };
    var Ie = function (t, e, n) {
      (t.prototype = e.prototype = n), (n.constructor = t);
    };
    function je(t, e) {
      var n = Object.create(t.prototype);
      for (var r in e) n[r] = e[r];
      return n;
    }
    function Ue() {}
    var De = '\\s*([+-]?\\d+)\\s*',
      He = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
      We = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
      $e = /^#([0-9a-f]{3,8})$/,
      Ye = new RegExp('^rgb\\(' + [De, De, De] + '\\)$'),
      Be = new RegExp('^rgb\\(' + [We, We, We] + '\\)$'),
      qe = new RegExp('^rgba\\(' + [De, De, De, He] + '\\)$'),
      Ve = new RegExp('^rgba\\(' + [We, We, We, He] + '\\)$'),
      Xe = new RegExp('^hsl\\(' + [He, We, We] + '\\)$'),
      Qe = new RegExp('^hsla\\(' + [He, We, We, He] + '\\)$'),
      Ke = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074,
      };
    function Ge() {
      return this.rgb().formatHex();
    }
    function Ze() {
      return this.rgb().formatRgb();
    }
    function Je(t) {
      var e, n;
      return (
        (t = (t + '').trim().toLowerCase()),
        (e = $e.exec(t))
          ? ((n = e[1].length),
            (e = parseInt(e[1], 16)),
            6 === n
              ? tn(e)
              : 3 === n
              ? new an(
                  ((e >> 8) & 15) | ((e >> 4) & 240),
                  ((e >> 4) & 15) | (240 & e),
                  ((15 & e) << 4) | (15 & e),
                  1
                )
              : 8 === n
              ? new an(
                  (e >> 24) & 255,
                  (e >> 16) & 255,
                  (e >> 8) & 255,
                  (255 & e) / 255
                )
              : 4 === n
              ? new an(
                  ((e >> 12) & 15) | ((e >> 8) & 240),
                  ((e >> 8) & 15) | ((e >> 4) & 240),
                  ((e >> 4) & 15) | (240 & e),
                  (((15 & e) << 4) | (15 & e)) / 255
                )
              : null)
          : (e = Ye.exec(t))
          ? new an(e[1], e[2], e[3], 1)
          : (e = Be.exec(t))
          ? new an(
              (255 * e[1]) / 100,
              (255 * e[2]) / 100,
              (255 * e[3]) / 100,
              1
            )
          : (e = qe.exec(t))
          ? en(e[1], e[2], e[3], e[4])
          : (e = Ve.exec(t))
          ? en((255 * e[1]) / 100, (255 * e[2]) / 100, (255 * e[3]) / 100, e[4])
          : (e = Xe.exec(t))
          ? sn(e[1], e[2] / 100, e[3] / 100, 1)
          : (e = Qe.exec(t))
          ? sn(e[1], e[2] / 100, e[3] / 100, e[4])
          : Ke.hasOwnProperty(t)
          ? tn(Ke[t])
          : 'transparent' === t
          ? new an(NaN, NaN, NaN, 0)
          : null
      );
    }
    function tn(t) {
      return new an((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
    }
    function en(t, e, n, r) {
      return r <= 0 && (t = e = n = NaN), new an(t, e, n, r);
    }
    function nn(t) {
      return (
        t instanceof Ue || (t = Je(t)),
        t ? new an((t = t.rgb()).r, t.g, t.b, t.opacity) : new an()
      );
    }
    function rn(t, e, n, r) {
      return 1 === arguments.length
        ? nn(t)
        : new an(t, e, n, null == r ? 1 : r);
    }
    function an(t, e, n, r) {
      (this.r = +t), (this.g = +e), (this.b = +n), (this.opacity = +r);
    }
    function on() {
      return '#' + un(this.r) + un(this.g) + un(this.b);
    }
    function ln() {
      var t = this.opacity;
      return (
        (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
          ? 'rgb('
          : 'rgba(') +
        Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
        ', ' +
        Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
        ', ' +
        Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
        (1 === t ? ')' : ', ' + t + ')')
      );
    }
    function un(t) {
      return (
        ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? '0' : '') +
        t.toString(16)
      );
    }
    function sn(t, e, n, r) {
      return (
        r <= 0
          ? (t = e = n = NaN)
          : n <= 0 || n >= 1
          ? (t = e = NaN)
          : e <= 0 && (t = NaN),
        new hn(t, e, n, r)
      );
    }
    function cn(t) {
      if (t instanceof hn) return new hn(t.h, t.s, t.l, t.opacity);
      if ((t instanceof Ue || (t = Je(t)), !t)) return new hn();
      if (t instanceof hn) return t;
      var e = (t = t.rgb()).r / 255,
        n = t.g / 255,
        r = t.b / 255,
        i = Math.min(e, n, r),
        a = Math.max(e, n, r),
        o = NaN,
        l = a - i,
        u = (a + i) / 2;
      return (
        l
          ? ((o =
              e === a
                ? (n - r) / l + 6 * (n < r)
                : n === a
                ? (r - e) / l + 2
                : (e - n) / l + 4),
            (l /= u < 0.5 ? a + i : 2 - a - i),
            (o *= 60))
          : (l = u > 0 && u < 1 ? 0 : o),
        new hn(o, l, u, t.opacity)
      );
    }
    function fn(t, e, n, r) {
      return 1 === arguments.length
        ? cn(t)
        : new hn(t, e, n, null == r ? 1 : r);
    }
    function hn(t, e, n, r) {
      (this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r);
    }
    function pn(t, e, n) {
      return (
        255 *
        (t < 60
          ? e + ((n - e) * t) / 60
          : t < 180
          ? n
          : t < 240
          ? e + ((n - e) * (240 - t)) / 60
          : e)
      );
    }
    function dn(t, e, n, r, i) {
      var a = t * t,
        o = a * t;
      return (
        ((1 - 3 * t + 3 * a - o) * e +
          (4 - 6 * a + 3 * o) * n +
          (1 + 3 * t + 3 * a - 3 * o) * r +
          o * i) /
        6
      );
    }
    Ie(Ue, Je, {
      copy: function (t) {
        return Object.assign(new this.constructor(), this, t);
      },
      displayable: function () {
        return this.rgb().displayable();
      },
      hex: Ge,
      formatHex: Ge,
      formatHsl: function () {
        return cn(this).formatHsl();
      },
      formatRgb: Ze,
      toString: Ze,
    }),
      Ie(
        an,
        rn,
        je(Ue, {
          brighter: function (t) {
            return (
              (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
              new an(this.r * t, this.g * t, this.b * t, this.opacity)
            );
          },
          darker: function (t) {
            return (
              (t = null == t ? 0.7 : Math.pow(0.7, t)),
              new an(this.r * t, this.g * t, this.b * t, this.opacity)
            );
          },
          rgb: function () {
            return this;
          },
          displayable: function () {
            return (
              -0.5 <= this.r &&
              this.r < 255.5 &&
              -0.5 <= this.g &&
              this.g < 255.5 &&
              -0.5 <= this.b &&
              this.b < 255.5 &&
              0 <= this.opacity &&
              this.opacity <= 1
            );
          },
          hex: on,
          formatHex: on,
          formatRgb: ln,
          toString: ln,
        })
      ),
      Ie(
        hn,
        fn,
        je(Ue, {
          brighter: function (t) {
            return (
              (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
              new hn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          darker: function (t) {
            return (
              (t = null == t ? 0.7 : Math.pow(0.7, t)),
              new hn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          rgb: function () {
            var t = (this.h % 360) + 360 * (this.h < 0),
              e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
              n = this.l,
              r = n + (n < 0.5 ? n : 1 - n) * e,
              i = 2 * n - r;
            return new an(
              pn(t >= 240 ? t - 240 : t + 120, i, r),
              pn(t, i, r),
              pn(t < 120 ? t + 240 : t - 120, i, r),
              this.opacity
            );
          },
          displayable: function () {
            return (
              ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
              0 <= this.l &&
              this.l <= 1 &&
              0 <= this.opacity &&
              this.opacity <= 1
            );
          },
          formatHsl: function () {
            var t = this.opacity;
            return (
              (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                ? 'hsl('
                : 'hsla(') +
              (this.h || 0) +
              ', ' +
              100 * (this.s || 0) +
              '%, ' +
              100 * (this.l || 0) +
              '%' +
              (1 === t ? ')' : ', ' + t + ')')
            );
          },
        })
      );
    var mn = function (t) {
      return function () {
        return t;
      };
    };
    function yn(t, e) {
      return function (n) {
        return t + n * e;
      };
    }
    function vn(t, e) {
      var n = e - t;
      return n
        ? yn(t, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n)
        : mn(isNaN(t) ? e : t);
    }
    function gn(t) {
      return 1 == (t = +t)
        ? _n
        : function (e, n) {
            return n - e
              ? (function (t, e, n) {
                  return (
                    (t = Math.pow(t, n)),
                    (e = Math.pow(e, n) - t),
                    (n = 1 / n),
                    function (r) {
                      return Math.pow(t + r * e, n);
                    }
                  );
                })(e, n, t)
              : mn(isNaN(e) ? n : e);
          };
    }
    function _n(t, e) {
      var n = e - t;
      return n ? yn(t, n) : mn(isNaN(t) ? e : t);
    }
    var bn = (function t(e) {
      var n = gn(e);
      function r(t, e) {
        var r = n((t = rn(t)).r, (e = rn(e)).r),
          i = n(t.g, e.g),
          a = n(t.b, e.b),
          o = _n(t.opacity, e.opacity);
        return function (e) {
          return (
            (t.r = r(e)), (t.g = i(e)), (t.b = a(e)), (t.opacity = o(e)), t + ''
          );
        };
      }
      return (r.gamma = t), r;
    })(1);
    function wn(t) {
      return function (e) {
        var n,
          r,
          i = e.length,
          a = new Array(i),
          o = new Array(i),
          l = new Array(i);
        for (n = 0; n < i; ++n)
          (r = rn(e[n])),
            (a[n] = r.r || 0),
            (o[n] = r.g || 0),
            (l[n] = r.b || 0);
        return (
          (a = t(a)),
          (o = t(o)),
          (l = t(l)),
          (r.opacity = 1),
          function (t) {
            return (r.r = a(t)), (r.g = o(t)), (r.b = l(t)), r + '';
          }
        );
      };
    }
    wn(function (t) {
      var e = t.length - 1;
      return function (n) {
        var r =
            n <= 0 ? (n = 0) : n >= 1 ? ((n = 1), e - 1) : Math.floor(n * e),
          i = t[r],
          a = t[r + 1],
          o = r > 0 ? t[r - 1] : 2 * i - a,
          l = r < e - 1 ? t[r + 2] : 2 * a - i;
        return dn((n - r / e) * e, o, i, a, l);
      };
    }),
      wn(function (t) {
        var e = t.length;
        return function (n) {
          var r = Math.floor(((n %= 1) < 0 ? ++n : n) * e),
            i = t[(r + e - 1) % e],
            a = t[r % e],
            o = t[(r + 1) % e],
            l = t[(r + 2) % e];
          return dn((n - r / e) * e, i, a, o, l);
        };
      });
    var xn = function (t, e) {
        var n,
          r = e ? e.length : 0,
          i = t ? Math.min(r, t.length) : 0,
          a = new Array(i),
          o = new Array(r);
        for (n = 0; n < i; ++n) a[n] = Ln(t[n], e[n]);
        for (; n < r; ++n) o[n] = e[n];
        return function (t) {
          for (n = 0; n < i; ++n) o[n] = a[n](t);
          return o;
        };
      },
      kn = function (t, e) {
        var n = new Date();
        return (
          (e -= t = +t),
          function (r) {
            return n.setTime(t + e * r), n;
          }
        );
      },
      En = function (t, e) {
        return (
          (e -= t = +t),
          function (n) {
            return t + e * n;
          }
        );
      },
      Tn = function (t, e) {
        var n,
          r = {},
          i = {};
        for (n in ((null !== t && 'object' == typeof t) || (t = {}),
        (null !== e && 'object' == typeof e) || (e = {}),
        e))
          n in t ? (r[n] = Ln(t[n], e[n])) : (i[n] = e[n]);
        return function (t) {
          for (n in r) i[n] = r[n](t);
          return i;
        };
      },
      Sn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      Cn = new RegExp(Sn.source, 'g');
    var Mn,
      Nn,
      Pn,
      On,
      An = function (t, e) {
        var n,
          r,
          i,
          a = (Sn.lastIndex = Cn.lastIndex = 0),
          o = -1,
          l = [],
          u = [];
        for (t += '', e += ''; (n = Sn.exec(t)) && (r = Cn.exec(e)); )
          (i = r.index) > a &&
            ((i = e.slice(a, i)), l[o] ? (l[o] += i) : (l[++o] = i)),
            (n = n[0]) === (r = r[0])
              ? l[o]
                ? (l[o] += r)
                : (l[++o] = r)
              : ((l[++o] = null), u.push({ i: o, x: En(n, r) })),
            (a = Cn.lastIndex);
        return (
          a < e.length && ((i = e.slice(a)), l[o] ? (l[o] += i) : (l[++o] = i)),
          l.length < 2
            ? u[0]
              ? (function (t) {
                  return function (e) {
                    return t(e) + '';
                  };
                })(u[0].x)
              : (function (t) {
                  return function () {
                    return t;
                  };
                })(e)
            : ((e = u.length),
              function (t) {
                for (var n, r = 0; r < e; ++r) l[(n = u[r]).i] = n.x(t);
                return l.join('');
              })
        );
      },
      Ln = function (t, e) {
        var n,
          r = typeof e;
        return null == e || 'boolean' === r
          ? mn(e)
          : ('number' === r
              ? En
              : 'string' === r
              ? (n = Je(e))
                ? ((e = n), bn)
                : An
              : e instanceof Je
              ? bn
              : e instanceof Date
              ? kn
              : Array.isArray(e)
              ? xn
              : ('function' != typeof e.valueOf &&
                  'function' != typeof e.toString) ||
                isNaN(e)
              ? Tn
              : En)(t, e);
      },
      Rn = function (t, e) {
        return (
          (e -= t = +t),
          function (n) {
            return Math.round(t + e * n);
          }
        );
      },
      Fn = 180 / Math.PI,
      zn = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
      },
      In = function (t, e, n, r, i, a) {
        var o, l, u;
        return (
          (o = Math.sqrt(t * t + e * e)) && ((t /= o), (e /= o)),
          (u = t * n + e * r) && ((n -= t * u), (r -= e * u)),
          (l = Math.sqrt(n * n + r * r)) && ((n /= l), (r /= l), (u /= l)),
          t * r < e * n && ((t = -t), (e = -e), (u = -u), (o = -o)),
          {
            translateX: i,
            translateY: a,
            rotate: Math.atan2(e, t) * Fn,
            skewX: Math.atan(u) * Fn,
            scaleX: o,
            scaleY: l,
          }
        );
      };
    function jn(t, e, n, r) {
      function i(t) {
        return t.length ? t.pop() + ' ' : '';
      }
      return function (a, o) {
        var l = [],
          u = [];
        return (
          (a = t(a)),
          (o = t(o)),
          (function (t, r, i, a, o, l) {
            if (t !== i || r !== a) {
              var u = o.push('translate(', null, e, null, n);
              l.push({ i: u - 4, x: En(t, i) }, { i: u - 2, x: En(r, a) });
            } else (i || a) && o.push('translate(' + i + e + a + n);
          })(a.translateX, a.translateY, o.translateX, o.translateY, l, u),
          (function (t, e, n, a) {
            t !== e
              ? (t - e > 180 ? (e += 360) : e - t > 180 && (t += 360),
                a.push({
                  i: n.push(i(n) + 'rotate(', null, r) - 2,
                  x: En(t, e),
                }))
              : e && n.push(i(n) + 'rotate(' + e + r);
          })(a.rotate, o.rotate, l, u),
          (function (t, e, n, a) {
            t !== e
              ? a.push({ i: n.push(i(n) + 'skewX(', null, r) - 2, x: En(t, e) })
              : e && n.push(i(n) + 'skewX(' + e + r);
          })(a.skewX, o.skewX, l, u),
          (function (t, e, n, r, a, o) {
            if (t !== n || e !== r) {
              var l = a.push(i(a) + 'scale(', null, ',', null, ')');
              o.push({ i: l - 4, x: En(t, n) }, { i: l - 2, x: En(e, r) });
            } else
              (1 === n && 1 === r) ||
                a.push(i(a) + 'scale(' + n + ',' + r + ')');
          })(a.scaleX, a.scaleY, o.scaleX, o.scaleY, l, u),
          (a = o = null),
          function (t) {
            for (var e, n = -1, r = u.length; ++n < r; )
              l[(e = u[n]).i] = e.x(t);
            return l.join('');
          }
        );
      };
    }
    var Un = jn(
        function (t) {
          return 'none' === t
            ? zn
            : (Mn ||
                ((Mn = document.createElement('DIV')),
                (Nn = document.documentElement),
                (Pn = document.defaultView)),
              (Mn.style.transform = t),
              (t = Pn.getComputedStyle(
                Nn.appendChild(Mn),
                null
              ).getPropertyValue('transform')),
              Nn.removeChild(Mn),
              (t = t.slice(7, -1).split(',')),
              In(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
        },
        'px, ',
        'px)',
        'deg)'
      ),
      Dn = jn(
        function (t) {
          return null == t
            ? zn
            : (On ||
                (On = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'g'
                )),
              On.setAttribute('transform', t),
              (t = On.transform.baseVal.consolidate())
                ? ((t = t.matrix), In(t.a, t.b, t.c, t.d, t.e, t.f))
                : zn);
        },
        ', ',
        ')',
        ')'
      );
    Math.SQRT2;
    function Hn(t) {
      return function (e, n) {
        var r = t((e = fn(e)).h, (n = fn(n)).h),
          i = _n(e.s, n.s),
          a = _n(e.l, n.l),
          o = _n(e.opacity, n.opacity);
        return function (t) {
          return (
            (e.h = r(t)), (e.s = i(t)), (e.l = a(t)), (e.opacity = o(t)), e + ''
          );
        };
      };
    }
    Hn(vn), Hn(_n);
    var Wn = Math.PI / 180,
      $n = 180 / Math.PI,
      Yn = 0.96422,
      Bn = 1,
      qn = 0.82521,
      Vn = 4 / 29,
      Xn = 6 / 29,
      Qn = 3 * Xn * Xn,
      Kn = Xn * Xn * Xn;
    function Gn(t) {
      if (t instanceof Jn) return new Jn(t.l, t.a, t.b, t.opacity);
      if (t instanceof or) return lr(t);
      t instanceof an || (t = nn(t));
      var e,
        n,
        r = rr(t.r),
        i = rr(t.g),
        a = rr(t.b),
        o = tr((0.2225045 * r + 0.7168786 * i + 0.0606169 * a) / Bn);
      return (
        r === i && i === a
          ? (e = n = o)
          : ((e = tr((0.4360747 * r + 0.3850649 * i + 0.1430804 * a) / Yn)),
            (n = tr((0.0139322 * r + 0.0971045 * i + 0.7141733 * a) / qn))),
        new Jn(116 * o - 16, 500 * (e - o), 200 * (o - n), t.opacity)
      );
    }
    function Zn(t, e, n, r) {
      return 1 === arguments.length
        ? Gn(t)
        : new Jn(t, e, n, null == r ? 1 : r);
    }
    function Jn(t, e, n, r) {
      (this.l = +t), (this.a = +e), (this.b = +n), (this.opacity = +r);
    }
    function tr(t) {
      return t > Kn ? Math.pow(t, 1 / 3) : t / Qn + Vn;
    }
    function er(t) {
      return t > Xn ? t * t * t : Qn * (t - Vn);
    }
    function nr(t) {
      return (
        255 *
        (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
      );
    }
    function rr(t) {
      return (t /= 255) <= 0.04045
        ? t / 12.92
        : Math.pow((t + 0.055) / 1.055, 2.4);
    }
    function ir(t) {
      if (t instanceof or) return new or(t.h, t.c, t.l, t.opacity);
      if ((t instanceof Jn || (t = Gn(t)), 0 === t.a && 0 === t.b))
        return new or(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
      var e = Math.atan2(t.b, t.a) * $n;
      return new or(
        e < 0 ? e + 360 : e,
        Math.sqrt(t.a * t.a + t.b * t.b),
        t.l,
        t.opacity
      );
    }
    function ar(t, e, n, r) {
      return 1 === arguments.length
        ? ir(t)
        : new or(t, e, n, null == r ? 1 : r);
    }
    function or(t, e, n, r) {
      (this.h = +t), (this.c = +e), (this.l = +n), (this.opacity = +r);
    }
    function lr(t) {
      if (isNaN(t.h)) return new Jn(t.l, 0, 0, t.opacity);
      var e = t.h * Wn;
      return new Jn(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
    }
    function ur(t) {
      return function (e, n) {
        var r = t((e = ar(e)).h, (n = ar(n)).h),
          i = _n(e.c, n.c),
          a = _n(e.l, n.l),
          o = _n(e.opacity, n.opacity);
        return function (t) {
          return (
            (e.h = r(t)), (e.c = i(t)), (e.l = a(t)), (e.opacity = o(t)), e + ''
          );
        };
      };
    }
    Ie(
      Jn,
      Zn,
      je(Ue, {
        brighter: function (t) {
          return new Jn(
            this.l + 18 * (null == t ? 1 : t),
            this.a,
            this.b,
            this.opacity
          );
        },
        darker: function (t) {
          return new Jn(
            this.l - 18 * (null == t ? 1 : t),
            this.a,
            this.b,
            this.opacity
          );
        },
        rgb: function () {
          var t = (this.l + 16) / 116,
            e = isNaN(this.a) ? t : t + this.a / 500,
            n = isNaN(this.b) ? t : t - this.b / 200;
          return new an(
            nr(
              3.1338561 * (e = Yn * er(e)) -
                1.6168667 * (t = Bn * er(t)) -
                0.4906146 * (n = qn * er(n))
            ),
            nr(-0.9787684 * e + 1.9161415 * t + 0.033454 * n),
            nr(0.0719453 * e - 0.2289914 * t + 1.4052427 * n),
            this.opacity
          );
        },
      })
    ),
      Ie(
        or,
        ar,
        je(Ue, {
          brighter: function (t) {
            return new or(
              this.h,
              this.c,
              this.l + 18 * (null == t ? 1 : t),
              this.opacity
            );
          },
          darker: function (t) {
            return new or(
              this.h,
              this.c,
              this.l - 18 * (null == t ? 1 : t),
              this.opacity
            );
          },
          rgb: function () {
            return lr(this).rgb();
          },
        })
      );
    ur(vn), ur(_n);
    var sr = -0.29227,
      cr = -0.90649,
      fr = 1.97294,
      hr = fr * cr,
      pr = 1.78277 * fr,
      dr = 1.78277 * sr - -0.14861 * cr;
    function mr(t, e, n, r) {
      return 1 === arguments.length
        ? (function (t) {
            if (t instanceof yr) return new yr(t.h, t.s, t.l, t.opacity);
            t instanceof an || (t = nn(t));
            var e = t.r / 255,
              n = t.g / 255,
              r = t.b / 255,
              i = (dr * r + hr * e - pr * n) / (dr + hr - pr),
              a = r - i,
              o = (fr * (n - i) - sr * a) / cr,
              l = Math.sqrt(o * o + a * a) / (fr * i * (1 - i)),
              u = l ? Math.atan2(o, a) * $n - 120 : NaN;
            return new yr(u < 0 ? u + 360 : u, l, i, t.opacity);
          })(t)
        : new yr(t, e, n, null == r ? 1 : r);
    }
    function yr(t, e, n, r) {
      (this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r);
    }
    function vr(t) {
      return (function e(n) {
        function r(e, r) {
          var i = t((e = mr(e)).h, (r = mr(r)).h),
            a = _n(e.s, r.s),
            o = _n(e.l, r.l),
            l = _n(e.opacity, r.opacity);
          return function (t) {
            return (
              (e.h = i(t)),
              (e.s = a(t)),
              (e.l = o(Math.pow(t, n))),
              (e.opacity = l(t)),
              e + ''
            );
          };
        }
        return (n = +n), (r.gamma = e), r;
      })(1);
    }
    Ie(
      yr,
      mr,
      je(Ue, {
        brighter: function (t) {
          return (
            (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
            new yr(this.h, this.s, this.l * t, this.opacity)
          );
        },
        darker: function (t) {
          return (
            (t = null == t ? 0.7 : Math.pow(0.7, t)),
            new yr(this.h, this.s, this.l * t, this.opacity)
          );
        },
        rgb: function () {
          var t = isNaN(this.h) ? 0 : (this.h + 120) * Wn,
            e = +this.l,
            n = isNaN(this.s) ? 0 : this.s * e * (1 - e),
            r = Math.cos(t),
            i = Math.sin(t);
          return new an(
            255 * (e + n * (-0.14861 * r + 1.78277 * i)),
            255 * (e + n * (sr * r + cr * i)),
            255 * (e + n * (fr * r)),
            this.opacity
          );
        },
      })
    );
    vr(vn), vr(_n);
    var gr,
      _r,
      br = 0,
      wr = 0,
      xr = 0,
      kr = 1e3,
      Er = 0,
      Tr = 0,
      Sr = 0,
      Cr =
        'object' == typeof performance && performance.now ? performance : Date,
      Mr =
        'object' == typeof window && window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : function (t) {
              setTimeout(t, 17);
            };
    function Nr() {
      return Tr || (Mr(Pr), (Tr = Cr.now() + Sr));
    }
    function Pr() {
      Tr = 0;
    }
    function Or() {
      this._call = this._time = this._next = null;
    }
    function Ar(t, e, n) {
      var r = new Or();
      return r.restart(t, e, n), r;
    }
    function Lr() {
      (Tr = (Er = Cr.now()) + Sr), (br = wr = 0);
      try {
        !(function () {
          Nr(), ++br;
          for (var t, e = gr; e; )
            (t = Tr - e._time) >= 0 && e._call.call(null, t), (e = e._next);
          --br;
        })();
      } finally {
        (br = 0),
          (function () {
            var t,
              e,
              n = gr,
              r = 1 / 0;
            for (; n; )
              n._call
                ? (r > n._time && (r = n._time), (t = n), (n = n._next))
                : ((e = n._next),
                  (n._next = null),
                  (n = t ? (t._next = e) : (gr = e)));
            (_r = t), Fr(r);
          })(),
          (Tr = 0);
      }
    }
    function Rr() {
      var t = Cr.now(),
        e = t - Er;
      e > kr && ((Sr -= e), (Er = t));
    }
    function Fr(t) {
      br ||
        (wr && (wr = clearTimeout(wr)),
        t - Tr > 24
          ? (t < 1 / 0 && (wr = setTimeout(Lr, t - Cr.now() - Sr)),
            xr && (xr = clearInterval(xr)))
          : (xr || ((Er = Cr.now()), (xr = setInterval(Rr, kr))),
            (br = 1),
            Mr(Lr)));
    }
    Or.prototype = Ar.prototype = {
      constructor: Or,
      restart: function (t, e, n) {
        if ('function' != typeof t)
          throw new TypeError('callback is not a function');
        (n = (null == n ? Nr() : +n) + (null == e ? 0 : +e)),
          this._next ||
            _r === this ||
            (_r ? (_r._next = this) : (gr = this), (_r = this)),
          (this._call = t),
          (this._time = n),
          Fr();
      },
      stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Fr());
      },
    };
    var zr = function (t, e, n) {
        var r = new Or();
        return (
          (e = null == e ? 0 : +e),
          r.restart(
            function (n) {
              r.stop(), t(n + e);
            },
            e,
            n
          ),
          r
        );
      },
      Ir = wt('start', 'end', 'cancel', 'interrupt'),
      jr = [],
      Ur = 0,
      Dr = 1,
      Hr = 2,
      Wr = 3,
      $r = 4,
      Yr = 5,
      Br = 6,
      qr = function (t, e, n, r, i, a) {
        var o = t.__transition;
        if (o) {
          if (n in o) return;
        } else t.__transition = {};
        !(function (t, e, n) {
          var r,
            i = t.__transition;
          function a(u) {
            var s, c, f, h;
            if (n.state !== Dr) return l();
            for (s in i)
              if ((h = i[s]).name === n.name) {
                if (h.state === Wr) return zr(a);
                h.state === $r
                  ? ((h.state = Br),
                    h.timer.stop(),
                    h.on.call('interrupt', t, t.__data__, h.index, h.group),
                    delete i[s])
                  : +s < e &&
                    ((h.state = Br),
                    h.timer.stop(),
                    h.on.call('cancel', t, t.__data__, h.index, h.group),
                    delete i[s]);
              }
            if (
              (zr(function () {
                n.state === Wr &&
                  ((n.state = $r), n.timer.restart(o, n.delay, n.time), o(u));
              }),
              (n.state = Hr),
              n.on.call('start', t, t.__data__, n.index, n.group),
              n.state === Hr)
            ) {
              for (
                n.state = Wr,
                  r = new Array((f = n.tween.length)),
                  s = 0,
                  c = -1;
                s < f;
                ++s
              )
                (h = n.tween[s].value.call(t, t.__data__, n.index, n.group)) &&
                  (r[++c] = h);
              r.length = c + 1;
            }
          }
          function o(e) {
            for (
              var i =
                  e < n.duration
                    ? n.ease.call(null, e / n.duration)
                    : (n.timer.restart(l), (n.state = Yr), 1),
                a = -1,
                o = r.length;
              ++a < o;

            )
              r[a].call(t, i);
            n.state === Yr &&
              (n.on.call('end', t, t.__data__, n.index, n.group), l());
          }
          function l() {
            for (var r in ((n.state = Br), n.timer.stop(), delete i[e], i))
              return;
            delete t.__transition;
          }
          (i[e] = n),
            (n.timer = Ar(
              function (t) {
                (n.state = Dr),
                  n.timer.restart(a, n.delay, n.time),
                  n.delay <= t && a(t - n.delay);
              },
              0,
              n.time
            ));
        })(t, n, {
          name: e,
          index: r,
          group: i,
          on: Ir,
          tween: jr,
          time: a.time,
          delay: a.delay,
          duration: a.duration,
          ease: a.ease,
          timer: null,
          state: Ur,
        });
      };
    function Vr(t, e) {
      var n = Qr(t, e);
      if (n.state > Ur) throw new Error('too late; already scheduled');
      return n;
    }
    function Xr(t, e) {
      var n = Qr(t, e);
      if (n.state > Wr) throw new Error('too late; already running');
      return n;
    }
    function Qr(t, e) {
      var n = t.__transition;
      if (!n || !(n = n[e])) throw new Error('transition not found');
      return n;
    }
    var Kr = function (t, e) {
      var n,
        r,
        i,
        a = t.__transition,
        o = !0;
      if (a) {
        for (i in ((e = null == e ? null : e + ''), a))
          (n = a[i]).name === e
            ? ((r = n.state > Hr && n.state < Yr),
              (n.state = Br),
              n.timer.stop(),
              n.on.call(
                r ? 'interrupt' : 'cancel',
                t,
                t.__data__,
                n.index,
                n.group
              ),
              delete a[i])
            : (o = !1);
        o && delete t.__transition;
      }
    };
    function Gr(t, e) {
      var n, r;
      return function () {
        var i = Xr(this, t),
          a = i.tween;
        if (a !== n)
          for (var o = 0, l = (r = n = a).length; o < l; ++o)
            if (r[o].name === e) {
              (r = r.slice()).splice(o, 1);
              break;
            }
        i.tween = r;
      };
    }
    function Zr(t, e, n) {
      var r, i;
      if ('function' != typeof n) throw new Error();
      return function () {
        var a = Xr(this, t),
          o = a.tween;
        if (o !== r) {
          i = (r = o).slice();
          for (var l = { name: e, value: n }, u = 0, s = i.length; u < s; ++u)
            if (i[u].name === e) {
              i[u] = l;
              break;
            }
          u === s && i.push(l);
        }
        a.tween = i;
      };
    }
    function Jr(t, e, n) {
      var r = t._id;
      return (
        t.each(function () {
          var t = Xr(this, r);
          (t.value || (t.value = {}))[e] = n.apply(this, arguments);
        }),
        function (t) {
          return Qr(t, r).value[e];
        }
      );
    }
    var ti = function (t, e) {
      var n;
      return ('number' == typeof e
        ? En
        : e instanceof Je
        ? bn
        : (n = Je(e))
        ? ((e = n), bn)
        : An)(t, e);
    };
    function ei(t) {
      return function () {
        this.removeAttribute(t);
      };
    }
    function ni(t) {
      return function () {
        this.removeAttributeNS(t.space, t.local);
      };
    }
    function ri(t, e, n) {
      var r,
        i,
        a = n + '';
      return function () {
        var o = this.getAttribute(t);
        return o === a ? null : o === r ? i : (i = e((r = o), n));
      };
    }
    function ii(t, e, n) {
      var r,
        i,
        a = n + '';
      return function () {
        var o = this.getAttributeNS(t.space, t.local);
        return o === a ? null : o === r ? i : (i = e((r = o), n));
      };
    }
    function ai(t, e, n) {
      var r, i, a;
      return function () {
        var o,
          l,
          u = n(this);
        if (null != u)
          return (o = this.getAttribute(t)) === (l = u + '')
            ? null
            : o === r && l === i
            ? a
            : ((i = l), (a = e((r = o), u)));
        this.removeAttribute(t);
      };
    }
    function oi(t, e, n) {
      var r, i, a;
      return function () {
        var o,
          l,
          u = n(this);
        if (null != u)
          return (o = this.getAttributeNS(t.space, t.local)) === (l = u + '')
            ? null
            : o === r && l === i
            ? a
            : ((i = l), (a = e((r = o), u)));
        this.removeAttributeNS(t.space, t.local);
      };
    }
    function li(t, e) {
      var n, r;
      function i() {
        var i = e.apply(this, arguments);
        return (
          i !== r &&
            (n =
              (r = i) &&
              (function (t, e) {
                return function (n) {
                  this.setAttributeNS(t.space, t.local, e(n));
                };
              })(t, i)),
          n
        );
      }
      return (i._value = e), i;
    }
    function ui(t, e) {
      var n, r;
      function i() {
        var i = e.apply(this, arguments);
        return (
          i !== r &&
            (n =
              (r = i) &&
              (function (t, e) {
                return function (n) {
                  this.setAttribute(t, e(n));
                };
              })(t, i)),
          n
        );
      }
      return (i._value = e), i;
    }
    function si(t, e) {
      return function () {
        Vr(this, t).delay = +e.apply(this, arguments);
      };
    }
    function ci(t, e) {
      return (
        (e = +e),
        function () {
          Vr(this, t).delay = e;
        }
      );
    }
    function fi(t, e) {
      return function () {
        Xr(this, t).duration = +e.apply(this, arguments);
      };
    }
    function hi(t, e) {
      return (
        (e = +e),
        function () {
          Xr(this, t).duration = e;
        }
      );
    }
    function pi(t, e) {
      if ('function' != typeof e) throw new Error();
      return function () {
        Xr(this, t).ease = e;
      };
    }
    function di(t, e, n) {
      var r,
        i,
        a = (function (t) {
          return (t + '')
            .trim()
            .split(/^|\s+/)
            .every(function (t) {
              var e = t.indexOf('.');
              return e >= 0 && (t = t.slice(0, e)), !t || 'start' === t;
            });
        })(e)
          ? Vr
          : Xr;
      return function () {
        var o = a(this, t),
          l = o.on;
        l !== r && (i = (r = l).copy()).on(e, n), (o.on = i);
      };
    }
    var mi = Ae.prototype.constructor;
    function yi(t) {
      return function () {
        this.style.removeProperty(t);
      };
    }
    function vi(t, e, n) {
      var r, i;
      function a() {
        var a = e.apply(this, arguments);
        return (
          a !== i &&
            (r =
              (i = a) &&
              (function (t, e, n) {
                return function (r) {
                  this.style.setProperty(t, e(r), n);
                };
              })(t, a, n)),
          r
        );
      }
      return (a._value = e), a;
    }
    var gi = 0;
    function _i(t, e, n, r) {
      (this._groups = t), (this._parents = e), (this._name = n), (this._id = r);
    }
    function bi() {
      return ++gi;
    }
    var wi = Ae.prototype;
    _i.prototype = function (t) {
      return Ae().transition(t);
    }.prototype = {
      constructor: _i,
      select: function (t) {
        var e = this._name,
          n = this._id;
        'function' != typeof t && (t = Nt(t));
        for (
          var r = this._groups, i = r.length, a = new Array(i), o = 0;
          o < i;
          ++o
        )
          for (
            var l, u, s = r[o], c = s.length, f = (a[o] = new Array(c)), h = 0;
            h < c;
            ++h
          )
            (l = s[h]) &&
              (u = t.call(l, l.__data__, h, s)) &&
              ('__data__' in l && (u.__data__ = l.__data__),
              (f[h] = u),
              qr(f[h], e, n, h, f, Qr(l, n)));
        return new _i(a, this._parents, e, n);
      },
      selectAll: function (t) {
        var e = this._name,
          n = this._id;
        'function' != typeof t && (t = Ot(t));
        for (
          var r = this._groups, i = r.length, a = [], o = [], l = 0;
          l < i;
          ++l
        )
          for (var u, s = r[l], c = s.length, f = 0; f < c; ++f)
            if ((u = s[f])) {
              for (
                var h,
                  p = t.call(u, u.__data__, f, s),
                  d = Qr(u, n),
                  m = 0,
                  y = p.length;
                m < y;
                ++m
              )
                (h = p[m]) && qr(h, e, n, m, p, d);
              a.push(p), o.push(u);
            }
        return new _i(a, o, e, n);
      },
      filter: function (t) {
        'function' != typeof t && (t = At(t));
        for (
          var e = this._groups, n = e.length, r = new Array(n), i = 0;
          i < n;
          ++i
        )
          for (
            var a, o = e[i], l = o.length, u = (r[i] = []), s = 0;
            s < l;
            ++s
          )
            (a = o[s]) && t.call(a, a.__data__, s, o) && u.push(a);
        return new _i(r, this._parents, this._name, this._id);
      },
      merge: function (t) {
        if (t._id !== this._id) throw new Error();
        for (
          var e = this._groups,
            n = t._groups,
            r = e.length,
            i = n.length,
            a = Math.min(r, i),
            o = new Array(r),
            l = 0;
          l < a;
          ++l
        )
          for (
            var u,
              s = e[l],
              c = n[l],
              f = s.length,
              h = (o[l] = new Array(f)),
              p = 0;
            p < f;
            ++p
          )
            (u = s[p] || c[p]) && (h[p] = u);
        for (; l < r; ++l) o[l] = e[l];
        return new _i(o, this._parents, this._name, this._id);
      },
      selection: function () {
        return new mi(this._groups, this._parents);
      },
      transition: function () {
        for (
          var t = this._name,
            e = this._id,
            n = bi(),
            r = this._groups,
            i = r.length,
            a = 0;
          a < i;
          ++a
        )
          for (var o, l = r[a], u = l.length, s = 0; s < u; ++s)
            if ((o = l[s])) {
              var c = Qr(o, e);
              qr(o, t, n, s, l, {
                time: c.time + c.delay + c.duration,
                delay: 0,
                duration: c.duration,
                ease: c.ease,
              });
            }
        return new _i(r, this._parents, t, n);
      },
      call: wi.call,
      nodes: wi.nodes,
      node: wi.node,
      size: wi.size,
      empty: wi.empty,
      each: wi.each,
      on: function (t, e) {
        var n = this._id;
        return arguments.length < 2
          ? Qr(this.node(), n).on.on(t)
          : this.each(di(n, t, e));
      },
      attr: function (t, e) {
        var n = Et(t),
          r = 'transform' === n ? Dn : ti;
        return this.attrTween(
          t,
          'function' == typeof e
            ? (n.local ? oi : ai)(n, r, Jr(this, 'attr.' + t, e))
            : null == e
            ? (n.local ? ni : ei)(n)
            : (n.local ? ii : ri)(n, r, e)
        );
      },
      attrTween: function (t, e) {
        var n = 'attr.' + t;
        if (arguments.length < 2) return (n = this.tween(n)) && n._value;
        if (null == e) return this.tween(n, null);
        if ('function' != typeof e) throw new Error();
        var r = Et(t);
        return this.tween(n, (r.local ? li : ui)(r, e));
      },
      style: function (t, e, n) {
        var r = 'transform' == (t += '') ? Un : ti;
        return null == e
          ? this.styleTween(
              t,
              (function (t, e) {
                var n, r, i;
                return function () {
                  var a = Qt(this, t),
                    o = (this.style.removeProperty(t), Qt(this, t));
                  return a === o
                    ? null
                    : a === n && o === r
                    ? i
                    : (i = e((n = a), (r = o)));
                };
              })(t, r)
            ).on('end.style.' + t, yi(t))
          : 'function' == typeof e
          ? this.styleTween(
              t,
              (function (t, e, n) {
                var r, i, a;
                return function () {
                  var o = Qt(this, t),
                    l = n(this),
                    u = l + '';
                  return (
                    null == l &&
                      (this.style.removeProperty(t), (u = l = Qt(this, t))),
                    o === u
                      ? null
                      : o === r && u === i
                      ? a
                      : ((i = u), (a = e((r = o), l)))
                  );
                };
              })(t, r, Jr(this, 'style.' + t, e))
            ).each(
              (function (t, e) {
                var n,
                  r,
                  i,
                  a,
                  o = 'style.' + e,
                  l = 'end.' + o;
                return function () {
                  var u = Xr(this, t),
                    s = u.on,
                    c = null == u.value[o] ? a || (a = yi(e)) : void 0;
                  (s === n && i === c) || (r = (n = s).copy()).on(l, (i = c)),
                    (u.on = r);
                };
              })(this._id, t)
            )
          : this.styleTween(
              t,
              (function (t, e, n) {
                var r,
                  i,
                  a = n + '';
                return function () {
                  var o = Qt(this, t);
                  return o === a ? null : o === r ? i : (i = e((r = o), n));
                };
              })(t, r, e),
              n
            ).on('end.style.' + t, null);
      },
      styleTween: function (t, e, n) {
        var r = 'style.' + (t += '');
        if (arguments.length < 2) return (r = this.tween(r)) && r._value;
        if (null == e) return this.tween(r, null);
        if ('function' != typeof e) throw new Error();
        return this.tween(r, vi(t, e, null == n ? '' : n));
      },
      text: function (t) {
        return this.tween(
          'text',
          'function' == typeof t
            ? (function (t) {
                return function () {
                  var e = t(this);
                  this.textContent = null == e ? '' : e;
                };
              })(Jr(this, 'text', t))
            : (function (t) {
                return function () {
                  this.textContent = t;
                };
              })(null == t ? '' : t + '')
        );
      },
      remove: function () {
        return this.on(
          'end.remove',
          ((t = this._id),
          function () {
            var e = this.parentNode;
            for (var n in this.__transition) if (+n !== t) return;
            e && e.removeChild(this);
          })
        );
        var t;
      },
      tween: function (t, e) {
        var n = this._id;
        if (((t += ''), arguments.length < 2)) {
          for (
            var r, i = Qr(this.node(), n).tween, a = 0, o = i.length;
            a < o;
            ++a
          )
            if ((r = i[a]).name === t) return r.value;
          return null;
        }
        return this.each((null == e ? Gr : Zr)(n, t, e));
      },
      delay: function (t) {
        var e = this._id;
        return arguments.length
          ? this.each(('function' == typeof t ? si : ci)(e, t))
          : Qr(this.node(), e).delay;
      },
      duration: function (t) {
        var e = this._id;
        return arguments.length
          ? this.each(('function' == typeof t ? fi : hi)(e, t))
          : Qr(this.node(), e).duration;
      },
      ease: function (t) {
        var e = this._id;
        return arguments.length ? this.each(pi(e, t)) : Qr(this.node(), e).ease;
      },
      end: function () {
        var t,
          e,
          n = this,
          r = n._id,
          i = n.size();
        return new Promise(function (a, o) {
          var l = { value: o },
            u = {
              value: function () {
                0 == --i && a();
              },
            };
          n.each(function () {
            var n = Xr(this, r),
              i = n.on;
            i !== t &&
              ((e = (t = i).copy())._.cancel.push(l),
              e._.interrupt.push(l),
              e._.end.push(u)),
              (n.on = e);
          });
        });
      },
    };
    (function t(e) {
      function n(t) {
        return Math.pow(t, e);
      }
      return (e = +e), (n.exponent = t), n;
    })(3),
      (function t(e) {
        function n(t) {
          return 1 - Math.pow(1 - t, e);
        }
        return (e = +e), (n.exponent = t), n;
      })(3),
      (function t(e) {
        function n(t) {
          return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
        }
        return (e = +e), (n.exponent = t), n;
      })(3),
      Math.PI;
    (function t(e) {
      function n(t) {
        return t * t * ((e + 1) * t - e);
      }
      return (e = +e), (n.overshoot = t), n;
    })(1.70158),
      (function t(e) {
        function n(t) {
          return --t * t * ((e + 1) * t + e) + 1;
        }
        return (e = +e), (n.overshoot = t), n;
      })(1.70158),
      (function t(e) {
        function n(t) {
          return (
            ((t *= 2) < 1
              ? t * t * ((e + 1) * t - e)
              : (t -= 2) * t * ((e + 1) * t + e) + 2) / 2
          );
        }
        return (e = +e), (n.overshoot = t), n;
      })(1.70158);
    var xi = 2 * Math.PI,
      ki =
        ((function t(e, n) {
          var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= xi);
          function i(t) {
            return e * Math.pow(2, 10 * --t) * Math.sin((r - t) / n);
          }
          return (
            (i.amplitude = function (e) {
              return t(e, n * xi);
            }),
            (i.period = function (n) {
              return t(e, n);
            }),
            i
          );
        })(1, 0.3),
        (function t(e, n) {
          var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= xi);
          function i(t) {
            return 1 - e * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / n);
          }
          return (
            (i.amplitude = function (e) {
              return t(e, n * xi);
            }),
            (i.period = function (n) {
              return t(e, n);
            }),
            i
          );
        })(1, 0.3),
        (function t(e, n) {
          var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= xi);
          function i(t) {
            return (
              ((t = 2 * t - 1) < 0
                ? e * Math.pow(2, 10 * t) * Math.sin((r - t) / n)
                : 2 - e * Math.pow(2, -10 * t) * Math.sin((r + t) / n)) / 2
            );
          }
          return (
            (i.amplitude = function (e) {
              return t(e, n * xi);
            }),
            (i.period = function (n) {
              return t(e, n);
            }),
            i
          );
        })(1, 0.3),
        {
          time: null,
          delay: 0,
          duration: 250,
          ease: function (t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
          },
        });
    function Ei(t, e) {
      for (var n; !(n = t.__transition) || !(n = n[e]); )
        if (!(t = t.parentNode)) return (ki.time = Nr()), ki;
      return n;
    }
    (Ae.prototype.interrupt = function (t) {
      return this.each(function () {
        Kr(this, t);
      });
    }),
      (Ae.prototype.transition = function (t) {
        var e, n;
        t instanceof _i
          ? ((e = t._id), (t = t._name))
          : ((e = bi()),
            ((n = ki).time = Nr()),
            (t = null == t ? null : t + ''));
        for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
          for (var o, l = r[a], u = l.length, s = 0; s < u; ++s)
            (o = l[s]) && qr(o, t, e, s, l, n || Ei(o, e));
        return new _i(r, this._parents, t, e);
      });
    function Ti(t) {
      return [+t[0], +t[1]];
    }
    function Si(t) {
      return [Ti(t[0]), Ti(t[1])];
    }
    ['w', 'e'].map(Ci),
      ['n', 's'].map(Ci),
      ['n', 'w', 'e', 's', 'nw', 'ne', 'sw', 'se'].map(Ci);
    function Ci(t) {
      return { type: t };
    }
    var Mi = function (t, e) {
      return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
    };
    var Ni = (function (t) {
      return (
        1 === t.length &&
          (t = (function (t) {
            return function (e, n) {
              return Mi(t(e), n);
            };
          })(t)),
        {
          left: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) < 0 ? (r = a + 1) : (i = a);
            }
            return r;
          },
          right: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) > 0 ? (i = a) : (r = a + 1);
            }
            return r;
          },
        }
      );
    })(Mi);
    Ni.right, Ni.left;
    var Pi = Array.prototype;
    Pi.slice, Pi.map, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2);
    Math.cos, Math.sin, Math.PI, Math.max;
    Array.prototype.slice;
    var Oi = Math.PI,
      Ai = 2 * Oi,
      Li = Ai - 1e-6;
    function Ri() {
      (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = '');
    }
    function Fi() {
      return new Ri();
    }
    Ri.prototype = Fi.prototype = {
      constructor: Ri,
      moveTo: function (t, e) {
        this._ +=
          'M' + (this._x0 = this._x1 = +t) + ',' + (this._y0 = this._y1 = +e);
      },
      closePath: function () {
        null !== this._x1 &&
          ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += 'Z'));
      },
      lineTo: function (t, e) {
        this._ += 'L' + (this._x1 = +t) + ',' + (this._y1 = +e);
      },
      quadraticCurveTo: function (t, e, n, r) {
        this._ +=
          'Q' + +t + ',' + +e + ',' + (this._x1 = +n) + ',' + (this._y1 = +r);
      },
      bezierCurveTo: function (t, e, n, r, i, a) {
        this._ +=
          'C' +
          +t +
          ',' +
          +e +
          ',' +
          +n +
          ',' +
          +r +
          ',' +
          (this._x1 = +i) +
          ',' +
          (this._y1 = +a);
      },
      arcTo: function (t, e, n, r, i) {
        (t = +t), (e = +e), (n = +n), (r = +r), (i = +i);
        var a = this._x1,
          o = this._y1,
          l = n - t,
          u = r - e,
          s = a - t,
          c = o - e,
          f = s * s + c * c;
        if (i < 0) throw new Error('negative radius: ' + i);
        if (null === this._x1)
          this._ += 'M' + (this._x1 = t) + ',' + (this._y1 = e);
        else if (f > 1e-6)
          if (Math.abs(c * l - u * s) > 1e-6 && i) {
            var h = n - a,
              p = r - o,
              d = l * l + u * u,
              m = h * h + p * p,
              y = Math.sqrt(d),
              v = Math.sqrt(f),
              g = i * Math.tan((Oi - Math.acos((d + f - m) / (2 * y * v))) / 2),
              _ = g / v,
              b = g / y;
            Math.abs(_ - 1) > 1e-6 &&
              (this._ += 'L' + (t + _ * s) + ',' + (e + _ * c)),
              (this._ +=
                'A' +
                i +
                ',' +
                i +
                ',0,0,' +
                +(c * h > s * p) +
                ',' +
                (this._x1 = t + b * l) +
                ',' +
                (this._y1 = e + b * u));
          } else this._ += 'L' + (this._x1 = t) + ',' + (this._y1 = e);
        else;
      },
      arc: function (t, e, n, r, i, a) {
        (t = +t), (e = +e), (a = !!a);
        var o = (n = +n) * Math.cos(r),
          l = n * Math.sin(r),
          u = t + o,
          s = e + l,
          c = 1 ^ a,
          f = a ? r - i : i - r;
        if (n < 0) throw new Error('negative radius: ' + n);
        null === this._x1
          ? (this._ += 'M' + u + ',' + s)
          : (Math.abs(this._x1 - u) > 1e-6 || Math.abs(this._y1 - s) > 1e-6) &&
            (this._ += 'L' + u + ',' + s),
          n &&
            (f < 0 && (f = (f % Ai) + Ai),
            f > Li
              ? (this._ +=
                  'A' +
                  n +
                  ',' +
                  n +
                  ',0,1,' +
                  c +
                  ',' +
                  (t - o) +
                  ',' +
                  (e - l) +
                  'A' +
                  n +
                  ',' +
                  n +
                  ',0,1,' +
                  c +
                  ',' +
                  (this._x1 = u) +
                  ',' +
                  (this._y1 = s))
              : f > 1e-6 &&
                (this._ +=
                  'A' +
                  n +
                  ',' +
                  n +
                  ',0,' +
                  +(f >= Oi) +
                  ',' +
                  c +
                  ',' +
                  (this._x1 = t + n * Math.cos(i)) +
                  ',' +
                  (this._y1 = e + n * Math.sin(i))));
      },
      rect: function (t, e, n, r) {
        this._ +=
          'M' +
          (this._x0 = this._x1 = +t) +
          ',' +
          (this._y0 = this._y1 = +e) +
          'h' +
          +n +
          'v' +
          +r +
          'h' +
          -n +
          'Z';
      },
      toString: function () {
        return this._;
      },
    };
    var zi = Fi;
    function Ii() {}
    function ji(t, e) {
      var n = new Ii();
      if (t instanceof Ii)
        t.each(function (t, e) {
          n.set(e, t);
        });
      else if (Array.isArray(t)) {
        var r,
          i = -1,
          a = t.length;
        if (null == e) for (; ++i < a; ) n.set(i, t[i]);
        else for (; ++i < a; ) n.set(e((r = t[i]), i, t), r);
      } else if (t) for (var o in t) n.set(o, t[o]);
      return n;
    }
    Ii.prototype = ji.prototype = {
      constructor: Ii,
      has: function (t) {
        return '$' + t in this;
      },
      get: function (t) {
        return this['$' + t];
      },
      set: function (t, e) {
        return (this['$' + t] = e), this;
      },
      remove: function (t) {
        var e = '$' + t;
        return e in this && delete this[e];
      },
      clear: function () {
        for (var t in this) '$' === t[0] && delete this[t];
      },
      keys: function () {
        var t = [];
        for (var e in this) '$' === e[0] && t.push(e.slice(1));
        return t;
      },
      values: function () {
        var t = [];
        for (var e in this) '$' === e[0] && t.push(this[e]);
        return t;
      },
      entries: function () {
        var t = [];
        for (var e in this)
          '$' === e[0] && t.push({ key: e.slice(1), value: this[e] });
        return t;
      },
      size: function () {
        var t = 0;
        for (var e in this) '$' === e[0] && ++t;
        return t;
      },
      empty: function () {
        for (var t in this) if ('$' === t[0]) return !1;
        return !0;
      },
      each: function (t) {
        for (var e in this) '$' === e[0] && t(this[e], e.slice(1), this);
      },
    };
    var Ui = ji;
    function Di() {}
    var Hi = Ui.prototype;
    function Wi(t, e) {
      var n = new Di();
      if (t instanceof Di)
        t.each(function (t) {
          n.add(t);
        });
      else if (t) {
        var r = -1,
          i = t.length;
        if (null == e) for (; ++r < i; ) n.add(t[r]);
        else for (; ++r < i; ) n.add(e(t[r], r, t));
      }
      return n;
    }
    Di.prototype = Wi.prototype = {
      constructor: Di,
      has: Hi.has,
      add: function (t) {
        return (this['$' + (t += '')] = t), this;
      },
      remove: Hi.remove,
      clear: Hi.clear,
      values: Hi.keys,
      size: Hi.size,
      empty: Hi.empty,
      each: Hi.each,
    };
    var $i = function (t, e) {
      return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
    };
    var Yi = (function (t) {
      return (
        1 === t.length &&
          (t = (function (t) {
            return function (e, n) {
              return $i(t(e), n);
            };
          })(t)),
        {
          left: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) < 0 ? (r = a + 1) : (i = a);
            }
            return r;
          },
          right: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) > 0 ? (i = a) : (r = a + 1);
            }
            return r;
          },
        }
      );
    })($i);
    Yi.right, Yi.left;
    var Bi = Array.prototype;
    Bi.slice, Bi.map, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2);
    Array.prototype.slice;
    var qi = {},
      Vi = {},
      Xi = 34,
      Qi = 10,
      Ki = 13;
    function Gi(t) {
      return new Function(
        'd',
        'return {' +
          t
            .map(function (t, e) {
              return JSON.stringify(t) + ': d[' + e + ']';
            })
            .join(',') +
          '}'
      );
    }
    function Zi(t) {
      var e = Object.create(null),
        n = [];
      return (
        t.forEach(function (t) {
          for (var r in t) r in e || n.push((e[r] = r));
        }),
        n
      );
    }
    function Ji(t, e) {
      var n = t + '',
        r = n.length;
      return r < e ? new Array(e - r + 1).join(0) + n : n;
    }
    function ta(t) {
      var e,
        n = t.getUTCHours(),
        r = t.getUTCMinutes(),
        i = t.getUTCSeconds(),
        a = t.getUTCMilliseconds();
      return isNaN(t)
        ? 'Invalid Date'
        : ((e = t.getUTCFullYear()) < 0
            ? '-' + Ji(-e, 6)
            : e > 9999
            ? '+' + Ji(e, 6)
            : Ji(e, 4)) +
            '-' +
            Ji(t.getUTCMonth() + 1, 2) +
            '-' +
            Ji(t.getUTCDate(), 2) +
            (a
              ? 'T' +
                Ji(n, 2) +
                ':' +
                Ji(r, 2) +
                ':' +
                Ji(i, 2) +
                '.' +
                Ji(a, 3) +
                'Z'
              : i
              ? 'T' + Ji(n, 2) + ':' + Ji(r, 2) + ':' + Ji(i, 2) + 'Z'
              : r || n
              ? 'T' + Ji(n, 2) + ':' + Ji(r, 2) + 'Z'
              : '');
    }
    var ea = function (t) {
        var e = new RegExp('["' + t + '\n\r]'),
          n = t.charCodeAt(0);
        function r(t, e) {
          var r,
            i = [],
            a = t.length,
            o = 0,
            l = 0,
            u = a <= 0,
            s = !1;
          function c() {
            if (u) return Vi;
            if (s) return (s = !1), qi;
            var e,
              r,
              i = o;
            if (t.charCodeAt(i) === Xi) {
              for (
                ;
                (o++ < a && t.charCodeAt(o) !== Xi) || t.charCodeAt(++o) === Xi;

              );
              return (
                (e = o) >= a
                  ? (u = !0)
                  : (r = t.charCodeAt(o++)) === Qi
                  ? (s = !0)
                  : r === Ki && ((s = !0), t.charCodeAt(o) === Qi && ++o),
                t.slice(i + 1, e - 1).replace(/""/g, '"')
              );
            }
            for (; o < a; ) {
              if ((r = t.charCodeAt((e = o++))) === Qi) s = !0;
              else if (r === Ki) (s = !0), t.charCodeAt(o) === Qi && ++o;
              else if (r !== n) continue;
              return t.slice(i, e);
            }
            return (u = !0), t.slice(i, a);
          }
          for (
            t.charCodeAt(a - 1) === Qi && --a,
              t.charCodeAt(a - 1) === Ki && --a;
            (r = c()) !== Vi;

          ) {
            for (var f = []; r !== qi && r !== Vi; ) f.push(r), (r = c());
            (e && null == (f = e(f, l++))) || i.push(f);
          }
          return i;
        }
        function i(e, n) {
          return e.map(function (e) {
            return n
              .map(function (t) {
                return o(e[t]);
              })
              .join(t);
          });
        }
        function a(e) {
          return e.map(o).join(t);
        }
        function o(t) {
          return null == t
            ? ''
            : t instanceof Date
            ? ta(t)
            : e.test((t += ''))
            ? '"' + t.replace(/"/g, '""') + '"'
            : t;
        }
        return {
          parse: function (t, e) {
            var n,
              i,
              a = r(t, function (t, r) {
                if (n) return n(t, r - 1);
                (i = t),
                  (n = e
                    ? (function (t, e) {
                        var n = Gi(t);
                        return function (r, i) {
                          return e(n(r), i, t);
                        };
                      })(t, e)
                    : Gi(t));
              });
            return (a.columns = i || []), a;
          },
          parseRows: r,
          format: function (e, n) {
            return (
              null == n && (n = Zi(e)),
              [n.map(o).join(t)].concat(i(e, n)).join('\n')
            );
          },
          formatBody: function (t, e) {
            return null == e && (e = Zi(t)), i(t, e).join('\n');
          },
          formatRows: function (t) {
            return t.map(a).join('\n');
          },
        };
      },
      na = ea(','),
      ra = na.parse,
      ia = (na.parseRows, na.format, na.formatBody, na.formatRows, ea('\t')),
      aa = ia.parse;
    ia.parseRows, ia.format, ia.formatBody, ia.formatRows;
    function oa(t) {
      if (!t.ok) throw new Error(t.status + ' ' + t.statusText);
      return t.text();
    }
    var la = function (t, e) {
      return fetch(t, e).then(oa);
    };
    function ua(t) {
      return function (e, n, r) {
        return (
          2 === arguments.length &&
            'function' == typeof n &&
            ((r = n), (n = void 0)),
          la(e, n).then(function (e) {
            return t(e, r);
          })
        );
      };
    }
    ua(ra), ua(aa);
    function sa(t) {
      return function (e, n) {
        return la(e, n).then(function (e) {
          return new DOMParser().parseFromString(e, t);
        });
      };
    }
    sa('application/xml'), sa('text/html'), sa('image/svg+xml');
    function ca(t, e, n, r) {
      if (isNaN(e) || isNaN(n)) return t;
      var i,
        a,
        o,
        l,
        u,
        s,
        c,
        f,
        h,
        p = t._root,
        d = { data: r },
        m = t._x0,
        y = t._y0,
        v = t._x1,
        g = t._y1;
      if (!p) return (t._root = d), t;
      for (; p.length; )
        if (
          ((s = e >= (a = (m + v) / 2)) ? (m = a) : (v = a),
          (c = n >= (o = (y + g) / 2)) ? (y = o) : (g = o),
          (i = p),
          !(p = p[(f = (c << 1) | s)]))
        )
          return (i[f] = d), t;
      if (
        ((l = +t._x.call(null, p.data)),
        (u = +t._y.call(null, p.data)),
        e === l && n === u)
      )
        return (d.next = p), i ? (i[f] = d) : (t._root = d), t;
      do {
        (i = i ? (i[f] = new Array(4)) : (t._root = new Array(4))),
          (s = e >= (a = (m + v) / 2)) ? (m = a) : (v = a),
          (c = n >= (o = (y + g) / 2)) ? (y = o) : (g = o);
      } while ((f = (c << 1) | s) == (h = ((u >= o) << 1) | (l >= a)));
      return (i[h] = p), (i[f] = d), t;
    }
    var fa = function (t, e, n, r, i) {
      (this.node = t),
        (this.x0 = e),
        (this.y0 = n),
        (this.x1 = r),
        (this.y1 = i);
    };
    function ha(t) {
      return t[0];
    }
    function pa(t) {
      return t[1];
    }
    function da(t, e, n) {
      var r = new ma(
        null == e ? ha : e,
        null == n ? pa : n,
        NaN,
        NaN,
        NaN,
        NaN
      );
      return null == t ? r : r.addAll(t);
    }
    function ma(t, e, n, r, i, a) {
      (this._x = t),
        (this._y = e),
        (this._x0 = n),
        (this._y0 = r),
        (this._x1 = i),
        (this._y1 = a),
        (this._root = void 0);
    }
    function ya(t) {
      for (var e = { data: t.data }, n = e; (t = t.next); )
        n = n.next = { data: t.data };
      return e;
    }
    var va = (da.prototype = ma.prototype);
    (va.copy = function () {
      var t,
        e,
        n = new ma(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        r = this._root;
      if (!r) return n;
      if (!r.length) return (n._root = ya(r)), n;
      for (
        t = [{ source: r, target: (n._root = new Array(4)) }];
        (r = t.pop());

      )
        for (var i = 0; i < 4; ++i)
          (e = r.source[i]) &&
            (e.length
              ? t.push({ source: e, target: (r.target[i] = new Array(4)) })
              : (r.target[i] = ya(e)));
      return n;
    }),
      (va.add = function (t) {
        var e = +this._x.call(null, t),
          n = +this._y.call(null, t);
        return ca(this.cover(e, n), e, n, t);
      }),
      (va.addAll = function (t) {
        var e,
          n,
          r,
          i,
          a = t.length,
          o = new Array(a),
          l = new Array(a),
          u = 1 / 0,
          s = 1 / 0,
          c = -1 / 0,
          f = -1 / 0;
        for (n = 0; n < a; ++n)
          isNaN((r = +this._x.call(null, (e = t[n])))) ||
            isNaN((i = +this._y.call(null, e))) ||
            ((o[n] = r),
            (l[n] = i),
            r < u && (u = r),
            r > c && (c = r),
            i < s && (s = i),
            i > f && (f = i));
        if (u > c || s > f) return this;
        for (this.cover(u, s).cover(c, f), n = 0; n < a; ++n)
          ca(this, o[n], l[n], t[n]);
        return this;
      }),
      (va.cover = function (t, e) {
        if (isNaN((t = +t)) || isNaN((e = +e))) return this;
        var n = this._x0,
          r = this._y0,
          i = this._x1,
          a = this._y1;
        if (isNaN(n))
          (i = (n = Math.floor(t)) + 1), (a = (r = Math.floor(e)) + 1);
        else {
          for (
            var o, l, u = i - n, s = this._root;
            n > t || t >= i || r > e || e >= a;

          )
            switch (
              ((l = ((e < r) << 1) | (t < n)),
              ((o = new Array(4))[l] = s),
              (s = o),
              (u *= 2),
              l)
            ) {
              case 0:
                (i = n + u), (a = r + u);
                break;
              case 1:
                (n = i - u), (a = r + u);
                break;
              case 2:
                (i = n + u), (r = a - u);
                break;
              case 3:
                (n = i - u), (r = a - u);
            }
          this._root && this._root.length && (this._root = s);
        }
        return (
          (this._x0 = n), (this._y0 = r), (this._x1 = i), (this._y1 = a), this
        );
      }),
      (va.data = function () {
        var t = [];
        return (
          this.visit(function (e) {
            if (!e.length)
              do {
                t.push(e.data);
              } while ((e = e.next));
          }),
          t
        );
      }),
      (va.extent = function (t) {
        return arguments.length
          ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
          : isNaN(this._x0)
          ? void 0
          : [
              [this._x0, this._y0],
              [this._x1, this._y1],
            ];
      }),
      (va.find = function (t, e, n) {
        var r,
          i,
          a,
          o,
          l,
          u,
          s,
          c = this._x0,
          f = this._y0,
          h = this._x1,
          p = this._y1,
          d = [],
          m = this._root;
        for (
          m && d.push(new fa(m, c, f, h, p)),
            null == n
              ? (n = 1 / 0)
              : ((c = t - n), (f = e - n), (h = t + n), (p = e + n), (n *= n));
          (u = d.pop());

        )
          if (
            !(
              !(m = u.node) ||
              (i = u.x0) > h ||
              (a = u.y0) > p ||
              (o = u.x1) < c ||
              (l = u.y1) < f
            )
          )
            if (m.length) {
              var y = (i + o) / 2,
                v = (a + l) / 2;
              d.push(
                new fa(m[3], y, v, o, l),
                new fa(m[2], i, v, y, l),
                new fa(m[1], y, a, o, v),
                new fa(m[0], i, a, y, v)
              ),
                (s = ((e >= v) << 1) | (t >= y)) &&
                  ((u = d[d.length - 1]),
                  (d[d.length - 1] = d[d.length - 1 - s]),
                  (d[d.length - 1 - s] = u));
            } else {
              var g = t - +this._x.call(null, m.data),
                _ = e - +this._y.call(null, m.data),
                b = g * g + _ * _;
              if (b < n) {
                var w = Math.sqrt((n = b));
                (c = t - w),
                  (f = e - w),
                  (h = t + w),
                  (p = e + w),
                  (r = m.data);
              }
            }
        return r;
      }),
      (va.remove = function (t) {
        if (
          isNaN((a = +this._x.call(null, t))) ||
          isNaN((o = +this._y.call(null, t)))
        )
          return this;
        var e,
          n,
          r,
          i,
          a,
          o,
          l,
          u,
          s,
          c,
          f,
          h,
          p = this._root,
          d = this._x0,
          m = this._y0,
          y = this._x1,
          v = this._y1;
        if (!p) return this;
        if (p.length)
          for (;;) {
            if (
              ((s = a >= (l = (d + y) / 2)) ? (d = l) : (y = l),
              (c = o >= (u = (m + v) / 2)) ? (m = u) : (v = u),
              (e = p),
              !(p = p[(f = (c << 1) | s)]))
            )
              return this;
            if (!p.length) break;
            (e[(f + 1) & 3] || e[(f + 2) & 3] || e[(f + 3) & 3]) &&
              ((n = e), (h = f));
          }
        for (; p.data !== t; ) if (((r = p), !(p = p.next))) return this;
        return (
          (i = p.next) && delete p.next,
          r
            ? (i ? (r.next = i) : delete r.next, this)
            : e
            ? (i ? (e[f] = i) : delete e[f],
              (p = e[0] || e[1] || e[2] || e[3]) &&
                p === (e[3] || e[2] || e[1] || e[0]) &&
                !p.length &&
                (n ? (n[h] = p) : (this._root = p)),
              this)
            : ((this._root = i), this)
        );
      }),
      (va.removeAll = function (t) {
        for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
        return this;
      }),
      (va.root = function () {
        return this._root;
      }),
      (va.size = function () {
        var t = 0;
        return (
          this.visit(function (e) {
            if (!e.length)
              do {
                ++t;
              } while ((e = e.next));
          }),
          t
        );
      }),
      (va.visit = function (t) {
        var e,
          n,
          r,
          i,
          a,
          o,
          l = [],
          u = this._root;
        for (
          u && l.push(new fa(u, this._x0, this._y0, this._x1, this._y1));
          (e = l.pop());

        )
          if (
            !t((u = e.node), (r = e.x0), (i = e.y0), (a = e.x1), (o = e.y1)) &&
            u.length
          ) {
            var s = (r + a) / 2,
              c = (i + o) / 2;
            (n = u[3]) && l.push(new fa(n, s, c, a, o)),
              (n = u[2]) && l.push(new fa(n, r, c, s, o)),
              (n = u[1]) && l.push(new fa(n, s, i, a, c)),
              (n = u[0]) && l.push(new fa(n, r, i, s, c));
          }
        return this;
      }),
      (va.visitAfter = function (t) {
        var e,
          n = [],
          r = [];
        for (
          this._root &&
          n.push(new fa(this._root, this._x0, this._y0, this._x1, this._y1));
          (e = n.pop());

        ) {
          var i = e.node;
          if (i.length) {
            var a,
              o = e.x0,
              l = e.y0,
              u = e.x1,
              s = e.y1,
              c = (o + u) / 2,
              f = (l + s) / 2;
            (a = i[0]) && n.push(new fa(a, o, l, c, f)),
              (a = i[1]) && n.push(new fa(a, c, l, u, f)),
              (a = i[2]) && n.push(new fa(a, o, f, c, s)),
              (a = i[3]) && n.push(new fa(a, c, f, u, s));
          }
          r.push(e);
        }
        for (; (e = r.pop()); ) t(e.node, e.x0, e.y0, e.x1, e.y1);
        return this;
      }),
      (va.x = function (t) {
        return arguments.length ? ((this._x = t), this) : this._x;
      }),
      (va.y = function (t) {
        return arguments.length ? ((this._y = t), this) : this._y;
      });
    Math.PI, Math.sqrt(5);
    var ga = function (t, e) {
        if (
          (n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf(
            'e'
          )) < 0
        )
          return null;
        var n,
          r = t.slice(0, n);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)];
      },
      _a = function (t) {
        return (t = ga(Math.abs(t))) ? t[1] : NaN;
      },
      ba = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    function wa(t) {
      if (!(e = ba.exec(t))) throw new Error('invalid format: ' + t);
      var e;
      return new xa({
        fill: e[1],
        align: e[2],
        sign: e[3],
        symbol: e[4],
        zero: e[5],
        width: e[6],
        comma: e[7],
        precision: e[8] && e[8].slice(1),
        trim: e[9],
        type: e[10],
      });
    }
    function xa(t) {
      (this.fill = void 0 === t.fill ? ' ' : t.fill + ''),
        (this.align = void 0 === t.align ? '>' : t.align + ''),
        (this.sign = void 0 === t.sign ? '-' : t.sign + ''),
        (this.symbol = void 0 === t.symbol ? '' : t.symbol + ''),
        (this.zero = !!t.zero),
        (this.width = void 0 === t.width ? void 0 : +t.width),
        (this.comma = !!t.comma),
        (this.precision = void 0 === t.precision ? void 0 : +t.precision),
        (this.trim = !!t.trim),
        (this.type = void 0 === t.type ? '' : t.type + '');
    }
    (wa.prototype = xa.prototype),
      (xa.prototype.toString = function () {
        return (
          this.fill +
          this.align +
          this.sign +
          this.symbol +
          (this.zero ? '0' : '') +
          (void 0 === this.width ? '' : Math.max(1, 0 | this.width)) +
          (this.comma ? ',' : '') +
          (void 0 === this.precision
            ? ''
            : '.' + Math.max(0, 0 | this.precision)) +
          (this.trim ? '~' : '') +
          this.type
        );
      });
    var ka,
      Ea,
      Ta,
      Sa,
      Ca = function (t) {
        t: for (var e, n = t.length, r = 1, i = -1; r < n; ++r)
          switch (t[r]) {
            case '.':
              i = e = r;
              break;
            case '0':
              0 === i && (i = r), (e = r);
              break;
            default:
              if (i > 0) {
                if (!+t[r]) break t;
                i = 0;
              }
          }
        return i > 0 ? t.slice(0, i) + t.slice(e + 1) : t;
      },
      Ma = function (t, e) {
        var n = ga(t, e);
        if (!n) return t + '';
        var r = n[0],
          i = n[1];
        return i < 0
          ? '0.' + new Array(-i).join('0') + r
          : r.length > i + 1
          ? r.slice(0, i + 1) + '.' + r.slice(i + 1)
          : r + new Array(i - r.length + 2).join('0');
      },
      Na = {
        '%': function (t, e) {
          return (100 * t).toFixed(e);
        },
        b: function (t) {
          return Math.round(t).toString(2);
        },
        c: function (t) {
          return t + '';
        },
        d: function (t) {
          return Math.round(t).toString(10);
        },
        e: function (t, e) {
          return t.toExponential(e);
        },
        f: function (t, e) {
          return t.toFixed(e);
        },
        g: function (t, e) {
          return t.toPrecision(e);
        },
        o: function (t) {
          return Math.round(t).toString(8);
        },
        p: function (t, e) {
          return Ma(100 * t, e);
        },
        r: Ma,
        s: function (t, e) {
          var n = ga(t, e);
          if (!n) return t + '';
          var r = n[0],
            i = n[1],
            a = i - (ka = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
            o = r.length;
          return a === o
            ? r
            : a > o
            ? r + new Array(a - o + 1).join('0')
            : a > 0
            ? r.slice(0, a) + '.' + r.slice(a)
            : '0.' +
              new Array(1 - a).join('0') +
              ga(t, Math.max(0, e + a - 1))[0];
        },
        X: function (t) {
          return Math.round(t).toString(16).toUpperCase();
        },
        x: function (t) {
          return Math.round(t).toString(16);
        },
      },
      Pa = function (t) {
        return t;
      },
      Oa = Array.prototype.map,
      Aa = [
        'y',
        'z',
        'a',
        'f',
        'p',
        'n',
        'µ',
        'm',
        '',
        'k',
        'M',
        'G',
        'T',
        'P',
        'E',
        'Z',
        'Y',
      ];
    (Ea = (function (t) {
      var e,
        n,
        r =
          void 0 === t.grouping || void 0 === t.thousands
            ? Pa
            : ((e = Oa.call(t.grouping, Number)),
              (n = t.thousands + ''),
              function (t, r) {
                for (
                  var i = t.length, a = [], o = 0, l = e[0], u = 0;
                  i > 0 &&
                  l > 0 &&
                  (u + l + 1 > r && (l = Math.max(1, r - u)),
                  a.push(t.substring((i -= l), i + l)),
                  !((u += l + 1) > r));

                )
                  l = e[(o = (o + 1) % e.length)];
                return a.reverse().join(n);
              }),
        i = void 0 === t.currency ? '' : t.currency[0] + '',
        a = void 0 === t.currency ? '' : t.currency[1] + '',
        o = void 0 === t.decimal ? '.' : t.decimal + '',
        l =
          void 0 === t.numerals
            ? Pa
            : (function (t) {
                return function (e) {
                  return e.replace(/[0-9]/g, function (e) {
                    return t[+e];
                  });
                };
              })(Oa.call(t.numerals, String)),
        u = void 0 === t.percent ? '%' : t.percent + '',
        s = void 0 === t.minus ? '-' : t.minus + '',
        c = void 0 === t.nan ? 'NaN' : t.nan + '';
      function f(t) {
        var e = (t = wa(t)).fill,
          n = t.align,
          f = t.sign,
          h = t.symbol,
          p = t.zero,
          d = t.width,
          m = t.comma,
          y = t.precision,
          v = t.trim,
          g = t.type;
        'n' === g
          ? ((m = !0), (g = 'g'))
          : Na[g] || (void 0 === y && (y = 12), (v = !0), (g = 'g')),
          (p || ('0' === e && '=' === n)) && ((p = !0), (e = '0'), (n = '='));
        var _ =
            '$' === h
              ? i
              : '#' === h && /[boxX]/.test(g)
              ? '0' + g.toLowerCase()
              : '',
          b = '$' === h ? a : /[%p]/.test(g) ? u : '',
          w = Na[g],
          x = /[defgprs%]/.test(g);
        function k(t) {
          var i,
            a,
            u,
            h = _,
            k = b;
          if ('c' === g) (k = w(t) + k), (t = '');
          else {
            var E = (t = +t) < 0;
            if (
              ((t = isNaN(t) ? c : w(Math.abs(t), y)),
              v && (t = Ca(t)),
              E && 0 == +t && (E = !1),
              (h =
                (E ? ('(' === f ? f : s) : '-' === f || '(' === f ? '' : f) +
                h),
              (k =
                ('s' === g ? Aa[8 + ka / 3] : '') +
                k +
                (E && '(' === f ? ')' : '')),
              x)
            )
              for (i = -1, a = t.length; ++i < a; )
                if (48 > (u = t.charCodeAt(i)) || u > 57) {
                  (k = (46 === u ? o + t.slice(i + 1) : t.slice(i)) + k),
                    (t = t.slice(0, i));
                  break;
                }
          }
          m && !p && (t = r(t, 1 / 0));
          var T = h.length + t.length + k.length,
            S = T < d ? new Array(d - T + 1).join(e) : '';
          switch (
            (m &&
              p &&
              ((t = r(S + t, S.length ? d - k.length : 1 / 0)), (S = '')),
            n)
          ) {
            case '<':
              t = h + t + k + S;
              break;
            case '=':
              t = h + S + t + k;
              break;
            case '^':
              t = S.slice(0, (T = S.length >> 1)) + h + t + k + S.slice(T);
              break;
            default:
              t = S + h + t + k;
          }
          return l(t);
        }
        return (
          (y =
            void 0 === y
              ? 6
              : /[gprs]/.test(g)
              ? Math.max(1, Math.min(21, y))
              : Math.max(0, Math.min(20, y))),
          (k.toString = function () {
            return t + '';
          }),
          k
        );
      }
      return {
        format: f,
        formatPrefix: function (t, e) {
          var n = f((((t = wa(t)).type = 'f'), t)),
            r = 3 * Math.max(-8, Math.min(8, Math.floor(_a(e) / 3))),
            i = Math.pow(10, -r),
            a = Aa[8 + r / 3];
          return function (t) {
            return n(i * t) + a;
          };
        },
      };
    })({
      decimal: '.',
      thousands: ',',
      grouping: [3],
      currency: ['$', ''],
      minus: '-',
    })),
      (Ta = Ea.format),
      (Sa = Ea.formatPrefix);
    var La = function () {
      return new Ra();
    };
    function Ra() {
      this.reset();
    }
    Ra.prototype = {
      constructor: Ra,
      reset: function () {
        this.s = this.t = 0;
      },
      add: function (t) {
        za(Fa, t, this.t),
          za(this, Fa.s, this.s),
          this.s ? (this.t += Fa.t) : (this.s = Fa.t);
      },
      valueOf: function () {
        return this.s;
      },
    };
    var Fa = new Ra();
    function za(t, e, n) {
      var r = (t.s = e + n),
        i = r - e,
        a = r - i;
      t.t = e - a + (n - i);
    }
    var Ia = 1e-6,
      ja = 1e-12,
      Ua = Math.PI,
      Da = Ua / 2,
      Ha = Ua / 4,
      Wa = 2 * Ua,
      $a = Ua / 180,
      Ya = Math.abs,
      Ba = Math.atan,
      qa = Math.atan2,
      Va = Math.cos,
      Xa = (Math.ceil, Math.exp),
      Qa = (Math.floor, Math.log),
      Ka = (Math.pow, Math.sin),
      Ga =
        Math.sign ||
        function (t) {
          return t > 0 ? 1 : t < 0 ? -1 : 0;
        },
      Za = Math.sqrt,
      Ja = Math.tan;
    function to(t) {
      return t > 1 ? 0 : t < -1 ? Ua : Math.acos(t);
    }
    function eo(t) {
      return t > 1 ? Da : t < -1 ? -Da : Math.asin(t);
    }
    function no() {}
    La(), La();
    function ro(t) {
      var e = t[0],
        n = t[1],
        r = Va(n);
      return [r * Va(e), r * Ka(e), Ka(n)];
    }
    function io(t, e) {
      return [
        t[1] * e[2] - t[2] * e[1],
        t[2] * e[0] - t[0] * e[2],
        t[0] * e[1] - t[1] * e[0],
      ];
    }
    function ao(t) {
      var e = Za(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
      (t[0] /= e), (t[1] /= e), (t[2] /= e);
    }
    La();
    function oo(t, e) {
      return [Ya(t) > Ua ? t + Math.round(-t / Wa) * Wa : t, e];
    }
    oo.invert = oo;
    var lo = function () {
        var t,
          e = [];
        return {
          point: function (e, n) {
            t.push([e, n]);
          },
          lineStart: function () {
            e.push((t = []));
          },
          lineEnd: no,
          rejoin: function () {
            e.length > 1 && e.push(e.pop().concat(e.shift()));
          },
          result: function () {
            var n = e;
            return (e = []), (t = null), n;
          },
        };
      },
      uo = function (t, e) {
        return Ya(t[0] - e[0]) < Ia && Ya(t[1] - e[1]) < Ia;
      };
    function so(t, e, n, r) {
      (this.x = t),
        (this.z = e),
        (this.o = n),
        (this.e = r),
        (this.v = !1),
        (this.n = this.p = null);
    }
    var co = function (t, e, n, r, i) {
      var a,
        o,
        l = [],
        u = [];
      if (
        (t.forEach(function (t) {
          if (!((e = t.length - 1) <= 0)) {
            var e,
              n,
              r = t[0],
              o = t[e];
            if (uo(r, o)) {
              for (i.lineStart(), a = 0; a < e; ++a)
                i.point((r = t[a])[0], r[1]);
              i.lineEnd();
            } else
              l.push((n = new so(r, t, null, !0))),
                u.push((n.o = new so(r, null, n, !1))),
                l.push((n = new so(o, t, null, !1))),
                u.push((n.o = new so(o, null, n, !0)));
          }
        }),
        l.length)
      ) {
        for (u.sort(e), fo(l), fo(u), a = 0, o = u.length; a < o; ++a)
          u[a].e = n = !n;
        for (var s, c, f = l[0]; ; ) {
          for (var h = f, p = !0; h.v; ) if ((h = h.n) === f) return;
          (s = h.z), i.lineStart();
          do {
            if (((h.v = h.o.v = !0), h.e)) {
              if (p)
                for (a = 0, o = s.length; a < o; ++a)
                  i.point((c = s[a])[0], c[1]);
              else r(h.x, h.n.x, 1, i);
              h = h.n;
            } else {
              if (p)
                for (s = h.p.z, a = s.length - 1; a >= 0; --a)
                  i.point((c = s[a])[0], c[1]);
              else r(h.x, h.p.x, -1, i);
              h = h.p;
            }
            (s = (h = h.o).z), (p = !p);
          } while (!h.v);
          i.lineEnd();
        }
      }
    };
    function fo(t) {
      if ((e = t.length)) {
        for (var e, n, r = 0, i = t[0]; ++r < e; )
          (i.n = n = t[r]), (n.p = i), (i = n);
        (i.n = n = t[0]), (n.p = i);
      }
    }
    var ho = La();
    function po(t) {
      return Ya(t[0]) <= Ua ? t[0] : Ga(t[0]) * (((Ya(t[0]) + Ua) % Wa) - Ua);
    }
    var mo = function (t, e) {
        var n = po(e),
          r = e[1],
          i = Ka(r),
          a = [Ka(n), -Va(n), 0],
          o = 0,
          l = 0;
        ho.reset(), 1 === i ? (r = Da + Ia) : -1 === i && (r = -Da - Ia);
        for (var u = 0, s = t.length; u < s; ++u)
          if ((f = (c = t[u]).length))
            for (
              var c,
                f,
                h = c[f - 1],
                p = po(h),
                d = h[1] / 2 + Ha,
                m = Ka(d),
                y = Va(d),
                v = 0;
              v < f;
              ++v, p = _, m = w, y = x, h = g
            ) {
              var g = c[v],
                _ = po(g),
                b = g[1] / 2 + Ha,
                w = Ka(b),
                x = Va(b),
                k = _ - p,
                E = k >= 0 ? 1 : -1,
                T = E * k,
                S = T > Ua,
                C = m * w;
              if (
                (ho.add(qa(C * E * Ka(T), y * x + C * Va(T))),
                (o += S ? k + E * Wa : k),
                S ^ (p >= n) ^ (_ >= n))
              ) {
                var M = io(ro(h), ro(g));
                ao(M);
                var N = io(a, M);
                ao(N);
                var P = (S ^ (k >= 0) ? -1 : 1) * eo(N[2]);
                (r > P || (r === P && (M[0] || M[1]))) &&
                  (l += S ^ (k >= 0) ? 1 : -1);
              }
            }
        return (o < -Ia || (o < Ia && ho < -Ia)) ^ (1 & l);
      },
      yo = function (t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
      };
    var vo = (function (t) {
      return (
        1 === t.length &&
          (t = (function (t) {
            return function (e, n) {
              return yo(t(e), n);
            };
          })(t)),
        {
          left: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) < 0 ? (r = a + 1) : (i = a);
            }
            return r;
          },
          right: function (e, n, r, i) {
            for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
              var a = (r + i) >>> 1;
              t(e[a], n) > 0 ? (i = a) : (r = a + 1);
            }
            return r;
          },
        }
      );
    })(yo);
    vo.right, vo.left;
    var go = Array.prototype;
    go.slice, go.map, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2);
    var _o = function (t) {
      for (var e, n, r, i = t.length, a = -1, o = 0; ++a < i; )
        o += t[a].length;
      for (n = new Array(o); --i >= 0; )
        for (e = (r = t[i]).length; --e >= 0; ) n[--o] = r[e];
      return n;
    };
    var bo = function (t, e, n, r) {
      return function (i) {
        var a,
          o,
          l,
          u = e(i),
          s = lo(),
          c = e(s),
          f = !1,
          h = {
            point: p,
            lineStart: m,
            lineEnd: y,
            polygonStart: function () {
              (h.point = v),
                (h.lineStart = g),
                (h.lineEnd = _),
                (o = []),
                (a = []);
            },
            polygonEnd: function () {
              (h.point = p), (h.lineStart = m), (h.lineEnd = y), (o = _o(o));
              var t = mo(a, r);
              o.length
                ? (f || (i.polygonStart(), (f = !0)), co(o, xo, t, n, i))
                : t &&
                  (f || (i.polygonStart(), (f = !0)),
                  i.lineStart(),
                  n(null, null, 1, i),
                  i.lineEnd()),
                f && (i.polygonEnd(), (f = !1)),
                (o = a = null);
            },
            sphere: function () {
              i.polygonStart(),
                i.lineStart(),
                n(null, null, 1, i),
                i.lineEnd(),
                i.polygonEnd();
            },
          };
        function p(e, n) {
          t(e, n) && i.point(e, n);
        }
        function d(t, e) {
          u.point(t, e);
        }
        function m() {
          (h.point = d), u.lineStart();
        }
        function y() {
          (h.point = p), u.lineEnd();
        }
        function v(t, e) {
          l.push([t, e]), c.point(t, e);
        }
        function g() {
          c.lineStart(), (l = []);
        }
        function _() {
          v(l[0][0], l[0][1]), c.lineEnd();
          var t,
            e,
            n,
            r,
            u = c.clean(),
            h = s.result(),
            p = h.length;
          if ((l.pop(), a.push(l), (l = null), p))
            if (1 & u) {
              if ((e = (n = h[0]).length - 1) > 0) {
                for (
                  f || (i.polygonStart(), (f = !0)), i.lineStart(), t = 0;
                  t < e;
                  ++t
                )
                  i.point((r = n[t])[0], r[1]);
                i.lineEnd();
              }
            } else
              p > 1 && 2 & u && h.push(h.pop().concat(h.shift())),
                o.push(h.filter(wo));
        }
        return h;
      };
    };
    function wo(t) {
      return t.length > 1;
    }
    function xo(t, e) {
      return (
        ((t = t.x)[0] < 0 ? t[1] - Da - Ia : Da - t[1]) -
        ((e = e.x)[0] < 0 ? e[1] - Da - Ia : Da - e[1])
      );
    }
    bo(
      function () {
        return !0;
      },
      function (t) {
        var e,
          n = NaN,
          r = NaN,
          i = NaN;
        return {
          lineStart: function () {
            t.lineStart(), (e = 1);
          },
          point: function (a, o) {
            var l = a > 0 ? Ua : -Ua,
              u = Ya(a - n);
            Ya(u - Ua) < Ia
              ? (t.point(n, (r = (r + o) / 2 > 0 ? Da : -Da)),
                t.point(i, r),
                t.lineEnd(),
                t.lineStart(),
                t.point(l, r),
                t.point(a, r),
                (e = 0))
              : i !== l &&
                u >= Ua &&
                (Ya(n - i) < Ia && (n -= i * Ia),
                Ya(a - l) < Ia && (a -= l * Ia),
                (r = (function (t, e, n, r) {
                  var i,
                    a,
                    o = Ka(t - n);
                  return Ya(o) > Ia
                    ? Ba(
                        (Ka(e) * (a = Va(r)) * Ka(n) -
                          Ka(r) * (i = Va(e)) * Ka(t)) /
                          (i * a * o)
                      )
                    : (e + r) / 2;
                })(n, r, a, o)),
                t.point(i, r),
                t.lineEnd(),
                t.lineStart(),
                t.point(l, r),
                (e = 0)),
              t.point((n = a), (r = o)),
              (i = l);
          },
          lineEnd: function () {
            t.lineEnd(), (n = r = NaN);
          },
          clean: function () {
            return 2 - e;
          },
        };
      },
      function (t, e, n, r) {
        var i;
        if (null == t)
          (i = n * Da),
            r.point(-Ua, i),
            r.point(0, i),
            r.point(Ua, i),
            r.point(Ua, 0),
            r.point(Ua, -i),
            r.point(0, -i),
            r.point(-Ua, -i),
            r.point(-Ua, 0),
            r.point(-Ua, i);
        else if (Ya(t[0] - e[0]) > Ia) {
          var a = t[0] < e[0] ? Ua : -Ua;
          (i = (n * a) / 2), r.point(-a, i), r.point(0, i), r.point(a, i);
        } else r.point(e[0], e[1]);
      },
      [-Ua, -Da]
    );
    La();
    La(), La();
    function ko(t) {
      this._context = t;
    }
    ko.prototype = {
      _radius: 4.5,
      pointRadius: function (t) {
        return (this._radius = t), this;
      },
      polygonStart: function () {
        this._line = 0;
      },
      polygonEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        this._point = 0;
      },
      lineEnd: function () {
        0 === this._line && this._context.closePath(), (this._point = NaN);
      },
      point: function (t, e) {
        switch (this._point) {
          case 0:
            this._context.moveTo(t, e), (this._point = 1);
            break;
          case 1:
            this._context.lineTo(t, e);
            break;
          default:
            this._context.moveTo(t + this._radius, e),
              this._context.arc(t, e, this._radius, 0, Wa);
        }
      },
      result: no,
    };
    La();
    function Eo() {
      this._string = [];
    }
    function To(t) {
      return (
        'm0,' +
        t +
        'a' +
        t +
        ',' +
        t +
        ' 0 1,1 0,' +
        -2 * t +
        'a' +
        t +
        ',' +
        t +
        ' 0 1,1 0,' +
        2 * t +
        'z'
      );
    }
    Eo.prototype = {
      _radius: 4.5,
      _circle: To(4.5),
      pointRadius: function (t) {
        return (
          (t = +t) !== this._radius &&
            ((this._radius = t), (this._circle = null)),
          this
        );
      },
      polygonStart: function () {
        this._line = 0;
      },
      polygonEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        this._point = 0;
      },
      lineEnd: function () {
        0 === this._line && this._string.push('Z'), (this._point = NaN);
      },
      point: function (t, e) {
        switch (this._point) {
          case 0:
            this._string.push('M', t, ',', e), (this._point = 1);
            break;
          case 1:
            this._string.push('L', t, ',', e);
            break;
          default:
            null == this._circle && (this._circle = To(this._radius)),
              this._string.push('M', t, ',', e, this._circle);
        }
      },
      result: function () {
        if (this._string.length) {
          var t = this._string.join('');
          return (this._string = []), t;
        }
        return null;
      },
    };
    function So(t) {
      return function (e) {
        var n = new Co();
        for (var r in t) n[r] = t[r];
        return (n.stream = e), n;
      };
    }
    function Co() {}
    Co.prototype = {
      constructor: Co,
      point: function (t, e) {
        this.stream.point(t, e);
      },
      sphere: function () {
        this.stream.sphere();
      },
      lineStart: function () {
        this.stream.lineStart();
      },
      lineEnd: function () {
        this.stream.lineEnd();
      },
      polygonStart: function () {
        this.stream.polygonStart();
      },
      polygonEnd: function () {
        this.stream.polygonEnd();
      },
    };
    Va(30 * $a);
    So({
      point: function (t, e) {
        this.stream.point(t * $a, e * $a);
      },
    });
    function Mo(t) {
      return function (e, n) {
        var r = Va(e),
          i = Va(n),
          a = t(r * i);
        return [a * i * Ka(e), a * Ka(n)];
      };
    }
    function No(t) {
      return function (e, n) {
        var r = Za(e * e + n * n),
          i = t(r),
          a = Ka(i),
          o = Va(i);
        return [qa(e * a, r * o), eo(r && (n * a) / r)];
      };
    }
    var Po = Mo(function (t) {
      return Za(2 / (1 + t));
    });
    Po.invert = No(function (t) {
      return 2 * eo(t / 2);
    });
    var Oo = Mo(function (t) {
      return (t = to(t)) && t / Ka(t);
    });
    Oo.invert = No(function (t) {
      return t;
    });
    function Ao(t, e) {
      return [t, Qa(Ja((Da + e) / 2))];
    }
    Ao.invert = function (t, e) {
      return [t, 2 * Ba(Xa(e)) - Da];
    };
    function Lo(t, e) {
      return [t, e];
    }
    Lo.invert = Lo;
    var Ro = 1.340264,
      Fo = -0.081106,
      zo = 893e-6,
      Io = 0.003796,
      jo = Za(3) / 2;
    function Uo(t, e) {
      var n = eo(jo * Ka(e)),
        r = n * n,
        i = r * r * r;
      return [
        (t * Va(n)) / (jo * (Ro + 3 * Fo * r + i * (7 * zo + 9 * Io * r))),
        n * (Ro + Fo * r + i * (zo + Io * r)),
      ];
    }
    Uo.invert = function (t, e) {
      for (
        var n, r = e, i = r * r, a = i * i * i, o = 0;
        o < 12 &&
        ((a =
          (i =
            (r -= n =
              (r * (Ro + Fo * i + a * (zo + Io * i)) - e) /
              (Ro + 3 * Fo * i + a * (7 * zo + 9 * Io * i))) * r) *
          i *
          i),
        !(Ya(n) < ja));
        ++o
      );
      return [
        (jo * t * (Ro + 3 * Fo * i + a * (7 * zo + 9 * Io * i))) / Va(r),
        eo(Ka(r) / jo),
      ];
    };
    function Do(t, e) {
      var n = Va(e),
        r = Va(t) * n;
      return [(n * Ka(t)) / r, Ka(e) / r];
    }
    Do.invert = No(Ba);
    function Ho(t, e) {
      var n = e * e,
        r = n * n;
      return [
        t *
          (0.8707 -
            0.131979 * n +
            r * (r * (0.003971 * n - 0.001529 * r) - 0.013791)),
        e *
          (1.007226 +
            n * (0.015085 + r * (0.028874 * n - 0.044475 - 0.005916 * r))),
      ];
    }
    Ho.invert = function (t, e) {
      var n,
        r = e,
        i = 25;
      do {
        var a = r * r,
          o = a * a;
        r -= n =
          (r *
            (1.007226 +
              a * (0.015085 + o * (0.028874 * a - 0.044475 - 0.005916 * o))) -
            e) /
          (1.007226 +
            a * (0.045255 + o * (0.259866 * a - 0.311325 - 0.005916 * 11 * o)));
      } while (Ya(n) > Ia && --i > 0);
      return [
        t /
          (0.8707 +
            (a = r * r) *
              (a * (a * a * a * (0.003971 - 0.001529 * a) - 0.013791) -
                0.131979)),
        r,
      ];
    };
    function Wo(t, e) {
      return [Va(e) * Ka(t), Ka(e)];
    }
    Wo.invert = No(eo);
    function $o(t, e) {
      var n = Va(e),
        r = 1 + Va(t) * n;
      return [(n * Ka(t)) / r, Ka(e) / r];
    }
    $o.invert = No(function (t) {
      return 2 * Ba(t);
    });
    function Yo(t, e) {
      return [Qa(Ja((Da + e) / 2)), -t];
    }
    Yo.invert = function (t, e) {
      return [-e, 2 * Ba(Xa(t)) - Da];
    };
    function Bo(t) {
      var e = 0,
        n = t.children,
        r = n && n.length;
      if (r) for (; --r >= 0; ) e += n[r].value;
      else e = 1;
      t.value = e;
    }
    function qo(t, e) {
      var n,
        r,
        i,
        a,
        o,
        l = new Ko(t),
        u = +t.value && (l.value = t.value),
        s = [l];
      for (null == e && (e = Vo); (n = s.pop()); )
        if ((u && (n.value = +n.data.value), (i = e(n.data)) && (o = i.length)))
          for (n.children = new Array(o), a = o - 1; a >= 0; --a)
            s.push((r = n.children[a] = new Ko(i[a]))),
              (r.parent = n),
              (r.depth = n.depth + 1);
      return l.eachBefore(Qo);
    }
    function Vo(t) {
      return t.children;
    }
    function Xo(t) {
      t.data = t.data.data;
    }
    function Qo(t) {
      var e = 0;
      do {
        t.height = e;
      } while ((t = t.parent) && t.height < ++e);
    }
    function Ko(t) {
      (this.data = t), (this.depth = this.height = 0), (this.parent = null);
    }
    Ko.prototype = qo.prototype = {
      constructor: Ko,
      count: function () {
        return this.eachAfter(Bo);
      },
      each: function (t) {
        var e,
          n,
          r,
          i,
          a = this,
          o = [a];
        do {
          for (e = o.reverse(), o = []; (a = e.pop()); )
            if ((t(a), (n = a.children)))
              for (r = 0, i = n.length; r < i; ++r) o.push(n[r]);
        } while (o.length);
        return this;
      },
      eachAfter: function (t) {
        for (var e, n, r, i = this, a = [i], o = []; (i = a.pop()); )
          if ((o.push(i), (e = i.children)))
            for (n = 0, r = e.length; n < r; ++n) a.push(e[n]);
        for (; (i = o.pop()); ) t(i);
        return this;
      },
      eachBefore: function (t) {
        for (var e, n, r = this, i = [r]; (r = i.pop()); )
          if ((t(r), (e = r.children)))
            for (n = e.length - 1; n >= 0; --n) i.push(e[n]);
        return this;
      },
      sum: function (t) {
        return this.eachAfter(function (e) {
          for (
            var n = +t(e.data) || 0, r = e.children, i = r && r.length;
            --i >= 0;

          )
            n += r[i].value;
          e.value = n;
        });
      },
      sort: function (t) {
        return this.eachBefore(function (e) {
          e.children && e.children.sort(t);
        });
      },
      path: function (t) {
        for (
          var e = this,
            n = (function (t, e) {
              if (t === e) return t;
              var n = t.ancestors(),
                r = e.ancestors(),
                i = null;
              (t = n.pop()), (e = r.pop());
              for (; t === e; ) (i = t), (t = n.pop()), (e = r.pop());
              return i;
            })(e, t),
            r = [e];
          e !== n;

        )
          (e = e.parent), r.push(e);
        for (var i = r.length; t !== n; ) r.splice(i, 0, t), (t = t.parent);
        return r;
      },
      ancestors: function () {
        for (var t = this, e = [t]; (t = t.parent); ) e.push(t);
        return e;
      },
      descendants: function () {
        var t = [];
        return (
          this.each(function (e) {
            t.push(e);
          }),
          t
        );
      },
      leaves: function () {
        var t = [];
        return (
          this.eachBefore(function (e) {
            e.children || t.push(e);
          }),
          t
        );
      },
      links: function () {
        var t = this,
          e = [];
        return (
          t.each(function (n) {
            n !== t && e.push({ source: n.parent, target: n });
          }),
          e
        );
      },
      copy: function () {
        return qo(this).eachBefore(Xo);
      },
    };
    Array.prototype.slice;
    function Go(t) {
      if ('function' != typeof t) throw new Error();
      return t;
    }
    function Zo() {
      return 0;
    }
    var Jo = function (t) {
      return function () {
        return t;
      };
    };
    var tl = function (t) {
        (t.x0 = Math.round(t.x0)),
          (t.y0 = Math.round(t.y0)),
          (t.x1 = Math.round(t.x1)),
          (t.y1 = Math.round(t.y1));
      },
      el = function (t, e, n, r, i) {
        for (
          var a,
            o = t.children,
            l = -1,
            u = o.length,
            s = t.value && (r - e) / t.value;
          ++l < u;

        )
          ((a = o[l]).y0 = n),
            (a.y1 = i),
            (a.x0 = e),
            (a.x1 = e += a.value * s);
      };
    function nl(t, e) {
      (this._ = t),
        (this.parent = null),
        (this.children = null),
        (this.A = null),
        (this.a = this),
        (this.z = 0),
        (this.m = 0),
        (this.c = 0),
        (this.s = 0),
        (this.t = null),
        (this.i = e);
    }
    nl.prototype = Object.create(Ko.prototype);
    var rl = function (t, e, n, r, i) {
        for (
          var a,
            o = t.children,
            l = -1,
            u = o.length,
            s = t.value && (i - n) / t.value;
          ++l < u;

        )
          ((a = o[l]).x0 = e),
            (a.x1 = r),
            (a.y0 = n),
            (a.y1 = n += a.value * s);
      },
      il = (1 + Math.sqrt(5)) / 2;
    function al(t, e, n, r, i, a) {
      for (
        var o,
          l,
          u,
          s,
          c,
          f,
          h,
          p,
          d,
          m,
          y,
          v = [],
          g = e.children,
          _ = 0,
          b = 0,
          w = g.length,
          x = e.value;
        _ < w;

      ) {
        (u = i - n), (s = a - r);
        do {
          c = g[b++].value;
        } while (!c && b < w);
        for (
          f = h = c,
            y = c * c * (m = Math.max(s / u, u / s) / (x * t)),
            d = Math.max(h / y, y / f);
          b < w;
          ++b
        ) {
          if (
            ((c += l = g[b].value),
            l < f && (f = l),
            l > h && (h = l),
            (y = c * c * m),
            (p = Math.max(h / y, y / f)) > d)
          ) {
            c -= l;
            break;
          }
          d = p;
        }
        v.push((o = { value: c, dice: u < s, children: g.slice(_, b) })),
          o.dice
            ? el(o, n, r, i, x ? (r += (s * c) / x) : a)
            : rl(o, n, r, x ? (n += (u * c) / x) : i, a),
          (x -= c),
          (_ = b);
      }
      return v;
    }
    var ol = (function t(e) {
      function n(t, n, r, i, a) {
        al(e, t, n, r, i, a);
      }
      return (
        (n.ratio = function (e) {
          return t((e = +e) > 1 ? e : 1);
        }),
        n
      );
    })(il);
    (function t(e) {
      function n(t, n, r, i, a) {
        if ((o = t._squarify) && o.ratio === e)
          for (
            var o, l, u, s, c, f = -1, h = o.length, p = t.value;
            ++f < h;

          ) {
            for (
              u = (l = o[f]).children, s = l.value = 0, c = u.length;
              s < c;
              ++s
            )
              l.value += u[s].value;
            l.dice
              ? el(l, n, r, i, (r += ((a - r) * l.value) / p))
              : rl(l, n, r, (n += ((i - n) * l.value) / p), a),
              (p -= l.value);
          }
        else (t._squarify = o = al(e, t, n, r, i, a)), (o.ratio = e);
      }
      return (
        (n.ratio = function (e) {
          return t((e = +e) > 1 ? e : 1);
        }),
        n
      );
    })(il);
    var ll = function () {
        return Math.random();
      },
      ul =
        ((function t(e) {
          function n(t, n) {
            return (
              (t = null == t ? 0 : +t),
              (n = null == n ? 1 : +n),
              1 === arguments.length ? ((n = t), (t = 0)) : (n -= t),
              function () {
                return e() * n + t;
              }
            );
          }
          return (n.source = t), n;
        })(ll),
        (function t(e) {
          function n(t, n) {
            var r, i;
            return (
              (t = null == t ? 0 : +t),
              (n = null == n ? 1 : +n),
              function () {
                var a;
                if (null != r) (a = r), (r = null);
                else
                  do {
                    (r = 2 * e() - 1), (a = 2 * e() - 1), (i = r * r + a * a);
                  } while (!i || i > 1);
                return t + n * a * Math.sqrt((-2 * Math.log(i)) / i);
              }
            );
          }
          return (n.source = t), n;
        })(ll)),
      sl =
        ((function t(e) {
          function n() {
            var t = ul.source(e).apply(this, arguments);
            return function () {
              return Math.exp(t());
            };
          }
          return (n.source = t), n;
        })(ll),
        (function t(e) {
          function n(t) {
            return function () {
              for (var n = 0, r = 0; r < t; ++r) n += e();
              return n;
            };
          }
          return (n.source = t), n;
        })(ll)),
      cl =
        ((function t(e) {
          function n(t) {
            var n = sl.source(e)(t);
            return function () {
              return n() / t;
            };
          }
          return (n.source = t), n;
        })(ll),
        (function t(e) {
          function n(t) {
            return function () {
              return -Math.log(1 - e()) / t;
            };
          }
          return (n.source = t), n;
        })(ll),
        function (t, e) {
          return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
        }),
      fl = function (t) {
        return (
          1 === t.length &&
            (t = (function (t) {
              return function (e, n) {
                return cl(t(e), n);
              };
            })(t)),
          {
            left: function (e, n, r, i) {
              for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
                var a = (r + i) >>> 1;
                t(e[a], n) < 0 ? (r = a + 1) : (i = a);
              }
              return r;
            },
            right: function (e, n, r, i) {
              for (null == r && (r = 0), null == i && (i = e.length); r < i; ) {
                var a = (r + i) >>> 1;
                t(e[a], n) > 0 ? (i = a) : (r = a + 1);
              }
              return r;
            },
          }
        );
      };
    var hl = fl(cl),
      pl = hl.right,
      dl = (hl.left, pl);
    var ml = Array.prototype,
      yl = (ml.slice, ml.map, Math.sqrt(50)),
      vl = Math.sqrt(10),
      gl = Math.sqrt(2),
      _l = function (t, e, n) {
        var r,
          i,
          a,
          o,
          l = -1;
        if (((n = +n), (t = +t) === (e = +e) && n > 0)) return [t];
        if (
          ((r = e < t) && ((i = t), (t = e), (e = i)),
          0 === (o = bl(t, e, n)) || !isFinite(o))
        )
          return [];
        if (o > 0)
          for (
            t = Math.ceil(t / o),
              e = Math.floor(e / o),
              a = new Array((i = Math.ceil(e - t + 1)));
            ++l < i;

          )
            a[l] = (t + l) * o;
        else
          for (
            t = Math.floor(t * o),
              e = Math.ceil(e * o),
              a = new Array((i = Math.ceil(t - e + 1)));
            ++l < i;

          )
            a[l] = (t - l) / o;
        return r && a.reverse(), a;
      };
    function bl(t, e, n) {
      var r = (e - t) / Math.max(0, n),
        i = Math.floor(Math.log(r) / Math.LN10),
        a = r / Math.pow(10, i);
      return i >= 0
        ? (a >= yl ? 10 : a >= vl ? 5 : a >= gl ? 2 : 1) * Math.pow(10, i)
        : -Math.pow(10, -i) / (a >= yl ? 10 : a >= vl ? 5 : a >= gl ? 2 : 1);
    }
    function wl(t, e, n) {
      var r = Math.abs(e - t) / Math.max(0, n),
        i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
        a = r / i;
      return (
        a >= yl ? (i *= 10) : a >= vl ? (i *= 5) : a >= gl && (i *= 2),
        e < t ? -i : i
      );
    }
    function xl(t, e) {
      switch (arguments.length) {
        case 0:
          break;
        case 1:
          this.range(t);
          break;
        default:
          this.range(e).domain(t);
      }
      return this;
    }
    var kl = Array.prototype,
      El = kl.map,
      Tl = kl.slice,
      Sl = { name: 'implicit' };
    function Cl() {
      var t = Ui(),
        e = [],
        n = [],
        r = Sl;
      function i(i) {
        var a = i + '',
          o = t.get(a);
        if (!o) {
          if (r !== Sl) return r;
          t.set(a, (o = e.push(i)));
        }
        return n[(o - 1) % n.length];
      }
      return (
        (i.domain = function (n) {
          if (!arguments.length) return e.slice();
          (e = []), (t = Ui());
          for (var r, a, o = -1, l = n.length; ++o < l; )
            t.has((a = (r = n[o]) + '')) || t.set(a, e.push(r));
          return i;
        }),
        (i.range = function (t) {
          return arguments.length ? ((n = Tl.call(t)), i) : n.slice();
        }),
        (i.unknown = function (t) {
          return arguments.length ? ((r = t), i) : r;
        }),
        (i.copy = function () {
          return Cl(e, n).unknown(r);
        }),
        xl.apply(i, arguments),
        i
      );
    }
    var Ml = function (t) {
        return function () {
          return t;
        };
      },
      Nl = function (t) {
        return +t;
      },
      Pl = [0, 1];
    function Ol(t) {
      return t;
    }
    function Al(t, e) {
      return (e -= t = +t)
        ? function (n) {
            return (n - t) / e;
          }
        : Ml(isNaN(e) ? NaN : 0.5);
    }
    function Ll(t) {
      var e,
        n = t[0],
        r = t[t.length - 1];
      return (
        n > r && ((e = n), (n = r), (r = e)),
        function (t) {
          return Math.max(n, Math.min(r, t));
        }
      );
    }
    function Rl(t, e, n) {
      var r = t[0],
        i = t[1],
        a = e[0],
        o = e[1];
      return (
        i < r
          ? ((r = Al(i, r)), (a = n(o, a)))
          : ((r = Al(r, i)), (a = n(a, o))),
        function (t) {
          return a(r(t));
        }
      );
    }
    function Fl(t, e, n) {
      var r = Math.min(t.length, e.length) - 1,
        i = new Array(r),
        a = new Array(r),
        o = -1;
      for (
        t[r] < t[0] && ((t = t.slice().reverse()), (e = e.slice().reverse()));
        ++o < r;

      )
        (i[o] = Al(t[o], t[o + 1])), (a[o] = n(e[o], e[o + 1]));
      return function (e) {
        var n = dl(t, e, 1, r) - 1;
        return a[n](i[n](e));
      };
    }
    function zl(t, e) {
      return e
        .domain(t.domain())
        .range(t.range())
        .interpolate(t.interpolate())
        .clamp(t.clamp())
        .unknown(t.unknown());
    }
    function Il() {
      var t,
        e,
        n,
        r,
        i,
        a,
        o = Pl,
        l = Pl,
        u = Ln,
        s = Ol;
      function c() {
        return (
          (r = Math.min(o.length, l.length) > 2 ? Fl : Rl), (i = a = null), f
        );
      }
      function f(e) {
        return isNaN((e = +e)) ? n : (i || (i = r(o.map(t), l, u)))(t(s(e)));
      }
      return (
        (f.invert = function (n) {
          return s(e((a || (a = r(l, o.map(t), En)))(n)));
        }),
        (f.domain = function (t) {
          return arguments.length
            ? ((o = El.call(t, Nl)), s === Ol || (s = Ll(o)), c())
            : o.slice();
        }),
        (f.range = function (t) {
          return arguments.length ? ((l = Tl.call(t)), c()) : l.slice();
        }),
        (f.rangeRound = function (t) {
          return (l = Tl.call(t)), (u = Rn), c();
        }),
        (f.clamp = function (t) {
          return arguments.length ? ((s = t ? Ll(o) : Ol), f) : s !== Ol;
        }),
        (f.interpolate = function (t) {
          return arguments.length ? ((u = t), c()) : u;
        }),
        (f.unknown = function (t) {
          return arguments.length ? ((n = t), f) : n;
        }),
        function (n, r) {
          return (t = n), (e = r), c();
        }
      );
    }
    function jl(t, e) {
      return Il()(t, e);
    }
    var Ul = function (t, e, n, r) {
      var i,
        a = wl(t, e, n);
      switch ((r = wa(null == r ? ',f' : r)).type) {
        case 's':
          var o = Math.max(Math.abs(t), Math.abs(e));
          return (
            null != r.precision ||
              isNaN(
                (i = (function (t, e) {
                  return Math.max(
                    0,
                    3 * Math.max(-8, Math.min(8, Math.floor(_a(e) / 3))) -
                      _a(Math.abs(t))
                  );
                })(a, o))
              ) ||
              (r.precision = i),
            Sa(r, o)
          );
        case '':
        case 'e':
        case 'g':
        case 'p':
        case 'r':
          null != r.precision ||
            isNaN(
              (i = (function (t, e) {
                return (
                  (t = Math.abs(t)),
                  (e = Math.abs(e) - t),
                  Math.max(0, _a(e) - _a(t)) + 1
                );
              })(a, Math.max(Math.abs(t), Math.abs(e))))
            ) ||
            (r.precision = i - ('e' === r.type));
          break;
        case 'f':
        case '%':
          null != r.precision ||
            isNaN(
              (i = (function (t) {
                return Math.max(0, -_a(Math.abs(t)));
              })(a))
            ) ||
            (r.precision = i - 2 * ('%' === r.type));
      }
      return Ta(r);
    };
    function Dl(t) {
      var e = t.domain;
      return (
        (t.ticks = function (t) {
          var n = e();
          return _l(n[0], n[n.length - 1], null == t ? 10 : t);
        }),
        (t.tickFormat = function (t, n) {
          var r = e();
          return Ul(r[0], r[r.length - 1], null == t ? 10 : t, n);
        }),
        (t.nice = function (n) {
          null == n && (n = 10);
          var r,
            i = e(),
            a = 0,
            o = i.length - 1,
            l = i[a],
            u = i[o];
          return (
            u < l && ((r = l), (l = u), (u = r), (r = a), (a = o), (o = r)),
            (r = bl(l, u, n)) > 0
              ? (r = bl(
                  (l = Math.floor(l / r) * r),
                  (u = Math.ceil(u / r) * r),
                  n
                ))
              : r < 0 &&
                (r = bl(
                  (l = Math.ceil(l * r) / r),
                  (u = Math.floor(u * r) / r),
                  n
                )),
            r > 0
              ? ((i[a] = Math.floor(l / r) * r),
                (i[o] = Math.ceil(u / r) * r),
                e(i))
              : r < 0 &&
                ((i[a] = Math.ceil(l * r) / r),
                (i[o] = Math.floor(u * r) / r),
                e(i)),
            t
          );
        }),
        t
      );
    }
    function Hl() {
      var t = jl(Ol, Ol);
      return (
        (t.copy = function () {
          return zl(t, Hl());
        }),
        xl.apply(t, arguments),
        Dl(t)
      );
    }
    var Wl = function (t, e) {
      var n,
        r = 0,
        i = (t = t.slice()).length - 1,
        a = t[r],
        o = t[i];
      return (
        o < a && ((n = r), (r = i), (i = n), (n = a), (a = o), (o = n)),
        (t[r] = e.floor(a)),
        (t[i] = e.ceil(o)),
        t
      );
    };
    function $l(t) {
      return Math.log(t);
    }
    function Yl(t) {
      return Math.exp(t);
    }
    function Bl(t) {
      return -Math.log(-t);
    }
    function ql(t) {
      return -Math.exp(-t);
    }
    function Vl(t) {
      return isFinite(t) ? +('1e' + t) : t < 0 ? 0 : t;
    }
    function Xl(t) {
      return function (e) {
        return -t(-e);
      };
    }
    function Ql(t) {
      var e,
        n,
        r = t($l, Yl),
        i = r.domain,
        a = 10;
      function o() {
        return (
          (e = (function (t) {
            return t === Math.E
              ? Math.log
              : (10 === t && Math.log10) ||
                  (2 === t && Math.log2) ||
                  ((t = Math.log(t)),
                  function (e) {
                    return Math.log(e) / t;
                  });
          })(a)),
          (n = (function (t) {
            return 10 === t
              ? Vl
              : t === Math.E
              ? Math.exp
              : function (e) {
                  return Math.pow(t, e);
                };
          })(a)),
          i()[0] < 0 ? ((e = Xl(e)), (n = Xl(n)), t(Bl, ql)) : t($l, Yl),
          r
        );
      }
      return (
        (r.base = function (t) {
          return arguments.length ? ((a = +t), o()) : a;
        }),
        (r.domain = function (t) {
          return arguments.length ? (i(t), o()) : i();
        }),
        (r.ticks = function (t) {
          var r,
            o = i(),
            l = o[0],
            u = o[o.length - 1];
          (r = u < l) && ((h = l), (l = u), (u = h));
          var s,
            c,
            f,
            h = e(l),
            p = e(u),
            d = null == t ? 10 : +t,
            m = [];
          if (!(a % 1) && p - h < d) {
            if (((h = Math.round(h) - 1), (p = Math.round(p) + 1), l > 0)) {
              for (; h < p; ++h)
                for (c = 1, s = n(h); c < a; ++c)
                  if (!((f = s * c) < l)) {
                    if (f > u) break;
                    m.push(f);
                  }
            } else
              for (; h < p; ++h)
                for (c = a - 1, s = n(h); c >= 1; --c)
                  if (!((f = s * c) < l)) {
                    if (f > u) break;
                    m.push(f);
                  }
          } else m = _l(h, p, Math.min(p - h, d)).map(n);
          return r ? m.reverse() : m;
        }),
        (r.tickFormat = function (t, i) {
          if (
            (null == i && (i = 10 === a ? '.0e' : ','),
            'function' != typeof i && (i = Ta(i)),
            t === 1 / 0)
          )
            return i;
          null == t && (t = 10);
          var o = Math.max(1, (a * t) / r.ticks().length);
          return function (t) {
            var r = t / n(Math.round(e(t)));
            return r * a < a - 0.5 && (r *= a), r <= o ? i(t) : '';
          };
        }),
        (r.nice = function () {
          return i(
            Wl(i(), {
              floor: function (t) {
                return n(Math.floor(e(t)));
              },
              ceil: function (t) {
                return n(Math.ceil(e(t)));
              },
            })
          );
        }),
        r
      );
    }
    function Kl() {
      var t = Ql(Il()).domain([1, 10]);
      return (
        (t.copy = function () {
          return zl(t, Kl()).base(t.base());
        }),
        xl.apply(t, arguments),
        t
      );
    }
    var Gl = new Date(),
      Zl = new Date();
    function Jl(t, e, n, r) {
      function i(e) {
        return t((e = 0 === arguments.length ? new Date() : new Date(+e))), e;
      }
      return (
        (i.floor = function (e) {
          return t((e = new Date(+e))), e;
        }),
        (i.ceil = function (n) {
          return t((n = new Date(n - 1))), e(n, 1), t(n), n;
        }),
        (i.round = function (t) {
          var e = i(t),
            n = i.ceil(t);
          return t - e < n - t ? e : n;
        }),
        (i.offset = function (t, n) {
          return e((t = new Date(+t)), null == n ? 1 : Math.floor(n)), t;
        }),
        (i.range = function (n, r, a) {
          var o,
            l = [];
          if (
            ((n = i.ceil(n)),
            (a = null == a ? 1 : Math.floor(a)),
            !(n < r && a > 0))
          )
            return l;
          do {
            l.push((o = new Date(+n))), e(n, a), t(n);
          } while (o < n && n < r);
          return l;
        }),
        (i.filter = function (n) {
          return Jl(
            function (e) {
              if (e >= e) for (; t(e), !n(e); ) e.setTime(e - 1);
            },
            function (t, r) {
              if (t >= t)
                if (r < 0) for (; ++r <= 0; ) for (; e(t, -1), !n(t); );
                else for (; --r >= 0; ) for (; e(t, 1), !n(t); );
            }
          );
        }),
        n &&
          ((i.count = function (e, r) {
            return (
              Gl.setTime(+e),
              Zl.setTime(+r),
              t(Gl),
              t(Zl),
              Math.floor(n(Gl, Zl))
            );
          }),
          (i.every = function (t) {
            return (
              (t = Math.floor(t)),
              isFinite(t) && t > 0
                ? t > 1
                  ? i.filter(
                      r
                        ? function (e) {
                            return r(e) % t == 0;
                          }
                        : function (e) {
                            return i.count(0, e) % t == 0;
                          }
                    )
                  : i
                : null
            );
          })),
        i
      );
    }
    var tu = Jl(
      function (t) {
        t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
      },
      function (t, e) {
        t.setFullYear(t.getFullYear() + e);
      },
      function (t, e) {
        return e.getFullYear() - t.getFullYear();
      },
      function (t) {
        return t.getFullYear();
      }
    );
    tu.every = function (t) {
      return isFinite((t = Math.floor(t))) && t > 0
        ? Jl(
            function (e) {
              e.setFullYear(Math.floor(e.getFullYear() / t) * t),
                e.setMonth(0, 1),
                e.setHours(0, 0, 0, 0);
            },
            function (e, n) {
              e.setFullYear(e.getFullYear() + n * t);
            }
          )
        : null;
    };
    var eu = tu,
      nu =
        (tu.range,
        Jl(
          function (t) {
            t.setDate(1), t.setHours(0, 0, 0, 0);
          },
          function (t, e) {
            t.setMonth(t.getMonth() + e);
          },
          function (t, e) {
            return (
              e.getMonth() -
              t.getMonth() +
              12 * (e.getFullYear() - t.getFullYear())
            );
          },
          function (t) {
            return t.getMonth();
          }
        )),
      ru = (nu.range, 6e4),
      iu = 6048e5;
    function au(t) {
      return Jl(
        function (e) {
          e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)),
            e.setHours(0, 0, 0, 0);
        },
        function (t, e) {
          t.setDate(t.getDate() + 7 * e);
        },
        function (t, e) {
          return (
            (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ru) / iu
          );
        }
      );
    }
    var ou = au(0),
      lu = au(1),
      uu = au(2),
      su = au(3),
      cu = au(4),
      fu = au(5),
      hu = au(6),
      pu =
        (ou.range,
        lu.range,
        uu.range,
        su.range,
        cu.range,
        fu.range,
        hu.range,
        Jl(
          function (t) {
            t.setHours(0, 0, 0, 0);
          },
          function (t, e) {
            t.setDate(t.getDate() + e);
          },
          function (t, e) {
            return (
              (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ru) /
              864e5
            );
          },
          function (t) {
            return t.getDate() - 1;
          }
        )),
      du = pu,
      mu =
        (pu.range,
        Jl(
          function (t) {
            t.setTime(
              t -
                t.getMilliseconds() -
                1e3 * t.getSeconds() -
                t.getMinutes() * ru
            );
          },
          function (t, e) {
            t.setTime(+t + 36e5 * e);
          },
          function (t, e) {
            return (e - t) / 36e5;
          },
          function (t) {
            return t.getHours();
          }
        )),
      yu =
        (mu.range,
        Jl(
          function (t) {
            t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds());
          },
          function (t, e) {
            t.setTime(+t + e * ru);
          },
          function (t, e) {
            return (e - t) / ru;
          },
          function (t) {
            return t.getMinutes();
          }
        )),
      vu =
        (yu.range,
        Jl(
          function (t) {
            t.setTime(t - t.getMilliseconds());
          },
          function (t, e) {
            t.setTime(+t + 1e3 * e);
          },
          function (t, e) {
            return (e - t) / 1e3;
          },
          function (t) {
            return t.getUTCSeconds();
          }
        )),
      gu =
        (vu.range,
        Jl(
          function () {},
          function (t, e) {
            t.setTime(+t + e);
          },
          function (t, e) {
            return e - t;
          }
        ));
    gu.every = function (t) {
      return (
        (t = Math.floor(t)),
        isFinite(t) && t > 0
          ? t > 1
            ? Jl(
                function (e) {
                  e.setTime(Math.floor(e / t) * t);
                },
                function (e, n) {
                  e.setTime(+e + n * t);
                },
                function (e, n) {
                  return (n - e) / t;
                }
              )
            : gu
          : null
      );
    };
    gu.range;
    function _u(t) {
      return Jl(
        function (e) {
          e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)),
            e.setUTCHours(0, 0, 0, 0);
        },
        function (t, e) {
          t.setUTCDate(t.getUTCDate() + 7 * e);
        },
        function (t, e) {
          return (e - t) / iu;
        }
      );
    }
    var bu = _u(0),
      wu = _u(1),
      xu = _u(2),
      ku = _u(3),
      Eu = _u(4),
      Tu = _u(5),
      Su = _u(6),
      Cu =
        (bu.range,
        wu.range,
        xu.range,
        ku.range,
        Eu.range,
        Tu.range,
        Su.range,
        Jl(
          function (t) {
            t.setUTCHours(0, 0, 0, 0);
          },
          function (t, e) {
            t.setUTCDate(t.getUTCDate() + e);
          },
          function (t, e) {
            return (e - t) / 864e5;
          },
          function (t) {
            return t.getUTCDate() - 1;
          }
        )),
      Mu = Cu,
      Nu =
        (Cu.range,
        Jl(
          function (t) {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
          },
          function (t, e) {
            t.setUTCFullYear(t.getUTCFullYear() + e);
          },
          function (t, e) {
            return e.getUTCFullYear() - t.getUTCFullYear();
          },
          function (t) {
            return t.getUTCFullYear();
          }
        ));
    Nu.every = function (t) {
      return isFinite((t = Math.floor(t))) && t > 0
        ? Jl(
            function (e) {
              e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
                e.setUTCMonth(0, 1),
                e.setUTCHours(0, 0, 0, 0);
            },
            function (e, n) {
              e.setUTCFullYear(e.getUTCFullYear() + n * t);
            }
          )
        : null;
    };
    var Pu = Nu;
    Nu.range;
    function Ou(t) {
      if (0 <= t.y && t.y < 100) {
        var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
        return e.setFullYear(t.y), e;
      }
      return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
    }
    function Au(t) {
      if (0 <= t.y && t.y < 100) {
        var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
        return e.setUTCFullYear(t.y), e;
      }
      return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
    }
    function Lu(t) {
      return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
    }
    var Ru,
      Fu,
      zu,
      Iu = { '-': '', _: ' ', 0: '0' },
      ju = /^\s*\d+/,
      Uu = /^%/,
      Du = /[\\^$*+?|[\]().{}]/g;
    function Hu(t, e, n) {
      var r = t < 0 ? '-' : '',
        i = (r ? -t : t) + '',
        a = i.length;
      return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
    }
    function Wu(t) {
      return t.replace(Du, '\\$&');
    }
    function $u(t) {
      return new RegExp('^(?:' + t.map(Wu).join('|') + ')', 'i');
    }
    function Yu(t) {
      for (var e = {}, n = -1, r = t.length; ++n < r; )
        e[t[n].toLowerCase()] = n;
      return e;
    }
    function Bu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 1));
      return r ? ((t.w = +r[0]), n + r[0].length) : -1;
    }
    function qu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 1));
      return r ? ((t.u = +r[0]), n + r[0].length) : -1;
    }
    function Vu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.U = +r[0]), n + r[0].length) : -1;
    }
    function Xu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.V = +r[0]), n + r[0].length) : -1;
    }
    function Qu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.W = +r[0]), n + r[0].length) : -1;
    }
    function Ku(t, e, n) {
      var r = ju.exec(e.slice(n, n + 4));
      return r ? ((t.y = +r[0]), n + r[0].length) : -1;
    }
    function Gu(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r
        ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length)
        : -1;
    }
    function Zu(t, e, n) {
      var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
      return r
        ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || '00'))), n + r[0].length)
        : -1;
    }
    function Ju(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.m = r[0] - 1), n + r[0].length) : -1;
    }
    function ts(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.d = +r[0]), n + r[0].length) : -1;
    }
    function es(t, e, n) {
      var r = ju.exec(e.slice(n, n + 3));
      return r ? ((t.m = 0), (t.d = +r[0]), n + r[0].length) : -1;
    }
    function ns(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.H = +r[0]), n + r[0].length) : -1;
    }
    function rs(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.M = +r[0]), n + r[0].length) : -1;
    }
    function is(t, e, n) {
      var r = ju.exec(e.slice(n, n + 2));
      return r ? ((t.S = +r[0]), n + r[0].length) : -1;
    }
    function as(t, e, n) {
      var r = ju.exec(e.slice(n, n + 3));
      return r ? ((t.L = +r[0]), n + r[0].length) : -1;
    }
    function os(t, e, n) {
      var r = ju.exec(e.slice(n, n + 6));
      return r ? ((t.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
    }
    function ls(t, e, n) {
      var r = Uu.exec(e.slice(n, n + 1));
      return r ? n + r[0].length : -1;
    }
    function us(t, e, n) {
      var r = ju.exec(e.slice(n));
      return r ? ((t.Q = +r[0]), n + r[0].length) : -1;
    }
    function ss(t, e, n) {
      var r = ju.exec(e.slice(n));
      return r ? ((t.Q = 1e3 * +r[0]), n + r[0].length) : -1;
    }
    function cs(t, e) {
      return Hu(t.getDate(), e, 2);
    }
    function fs(t, e) {
      return Hu(t.getHours(), e, 2);
    }
    function hs(t, e) {
      return Hu(t.getHours() % 12 || 12, e, 2);
    }
    function ps(t, e) {
      return Hu(1 + du.count(eu(t), t), e, 3);
    }
    function ds(t, e) {
      return Hu(t.getMilliseconds(), e, 3);
    }
    function ms(t, e) {
      return ds(t, e) + '000';
    }
    function ys(t, e) {
      return Hu(t.getMonth() + 1, e, 2);
    }
    function vs(t, e) {
      return Hu(t.getMinutes(), e, 2);
    }
    function gs(t, e) {
      return Hu(t.getSeconds(), e, 2);
    }
    function _s(t) {
      var e = t.getDay();
      return 0 === e ? 7 : e;
    }
    function bs(t, e) {
      return Hu(ou.count(eu(t), t), e, 2);
    }
    function ws(t, e) {
      var n = t.getDay();
      return (
        (t = n >= 4 || 0 === n ? cu(t) : cu.ceil(t)),
        Hu(cu.count(eu(t), t) + (4 === eu(t).getDay()), e, 2)
      );
    }
    function xs(t) {
      return t.getDay();
    }
    function ks(t, e) {
      return Hu(lu.count(eu(t), t), e, 2);
    }
    function Es(t, e) {
      return Hu(t.getFullYear() % 100, e, 2);
    }
    function Ts(t, e) {
      return Hu(t.getFullYear() % 1e4, e, 4);
    }
    function Ss(t) {
      var e = t.getTimezoneOffset();
      return (
        (e > 0 ? '-' : ((e *= -1), '+')) +
        Hu((e / 60) | 0, '0', 2) +
        Hu(e % 60, '0', 2)
      );
    }
    function Cs(t, e) {
      return Hu(t.getUTCDate(), e, 2);
    }
    function Ms(t, e) {
      return Hu(t.getUTCHours(), e, 2);
    }
    function Ns(t, e) {
      return Hu(t.getUTCHours() % 12 || 12, e, 2);
    }
    function Ps(t, e) {
      return Hu(1 + Mu.count(Pu(t), t), e, 3);
    }
    function Os(t, e) {
      return Hu(t.getUTCMilliseconds(), e, 3);
    }
    function As(t, e) {
      return Os(t, e) + '000';
    }
    function Ls(t, e) {
      return Hu(t.getUTCMonth() + 1, e, 2);
    }
    function Rs(t, e) {
      return Hu(t.getUTCMinutes(), e, 2);
    }
    function Fs(t, e) {
      return Hu(t.getUTCSeconds(), e, 2);
    }
    function zs(t) {
      var e = t.getUTCDay();
      return 0 === e ? 7 : e;
    }
    function Is(t, e) {
      return Hu(bu.count(Pu(t), t), e, 2);
    }
    function js(t, e) {
      var n = t.getUTCDay();
      return (
        (t = n >= 4 || 0 === n ? Eu(t) : Eu.ceil(t)),
        Hu(Eu.count(Pu(t), t) + (4 === Pu(t).getUTCDay()), e, 2)
      );
    }
    function Us(t) {
      return t.getUTCDay();
    }
    function Ds(t, e) {
      return Hu(wu.count(Pu(t), t), e, 2);
    }
    function Hs(t, e) {
      return Hu(t.getUTCFullYear() % 100, e, 2);
    }
    function Ws(t, e) {
      return Hu(t.getUTCFullYear() % 1e4, e, 4);
    }
    function $s() {
      return '+0000';
    }
    function Ys() {
      return '%';
    }
    function Bs(t) {
      return +t;
    }
    function qs(t) {
      return Math.floor(+t / 1e3);
    }
    !(function (t) {
      (Ru = (function (t) {
        var e = t.dateTime,
          n = t.date,
          r = t.time,
          i = t.periods,
          a = t.days,
          o = t.shortDays,
          l = t.months,
          u = t.shortMonths,
          s = $u(i),
          c = Yu(i),
          f = $u(a),
          h = Yu(a),
          p = $u(o),
          d = Yu(o),
          m = $u(l),
          y = Yu(l),
          v = $u(u),
          g = Yu(u),
          _ = {
            a: function (t) {
              return o[t.getDay()];
            },
            A: function (t) {
              return a[t.getDay()];
            },
            b: function (t) {
              return u[t.getMonth()];
            },
            B: function (t) {
              return l[t.getMonth()];
            },
            c: null,
            d: cs,
            e: cs,
            f: ms,
            H: fs,
            I: hs,
            j: ps,
            L: ds,
            m: ys,
            M: vs,
            p: function (t) {
              return i[+(t.getHours() >= 12)];
            },
            Q: Bs,
            s: qs,
            S: gs,
            u: _s,
            U: bs,
            V: ws,
            w: xs,
            W: ks,
            x: null,
            X: null,
            y: Es,
            Y: Ts,
            Z: Ss,
            '%': Ys,
          },
          b = {
            a: function (t) {
              return o[t.getUTCDay()];
            },
            A: function (t) {
              return a[t.getUTCDay()];
            },
            b: function (t) {
              return u[t.getUTCMonth()];
            },
            B: function (t) {
              return l[t.getUTCMonth()];
            },
            c: null,
            d: Cs,
            e: Cs,
            f: As,
            H: Ms,
            I: Ns,
            j: Ps,
            L: Os,
            m: Ls,
            M: Rs,
            p: function (t) {
              return i[+(t.getUTCHours() >= 12)];
            },
            Q: Bs,
            s: qs,
            S: Fs,
            u: zs,
            U: Is,
            V: js,
            w: Us,
            W: Ds,
            x: null,
            X: null,
            y: Hs,
            Y: Ws,
            Z: $s,
            '%': Ys,
          },
          w = {
            a: function (t, e, n) {
              var r = p.exec(e.slice(n));
              return r ? ((t.w = d[r[0].toLowerCase()]), n + r[0].length) : -1;
            },
            A: function (t, e, n) {
              var r = f.exec(e.slice(n));
              return r ? ((t.w = h[r[0].toLowerCase()]), n + r[0].length) : -1;
            },
            b: function (t, e, n) {
              var r = v.exec(e.slice(n));
              return r ? ((t.m = g[r[0].toLowerCase()]), n + r[0].length) : -1;
            },
            B: function (t, e, n) {
              var r = m.exec(e.slice(n));
              return r ? ((t.m = y[r[0].toLowerCase()]), n + r[0].length) : -1;
            },
            c: function (t, n, r) {
              return E(t, e, n, r);
            },
            d: ts,
            e: ts,
            f: os,
            H: ns,
            I: ns,
            j: es,
            L: as,
            m: Ju,
            M: rs,
            p: function (t, e, n) {
              var r = s.exec(e.slice(n));
              return r ? ((t.p = c[r[0].toLowerCase()]), n + r[0].length) : -1;
            },
            Q: us,
            s: ss,
            S: is,
            u: qu,
            U: Vu,
            V: Xu,
            w: Bu,
            W: Qu,
            x: function (t, e, r) {
              return E(t, n, e, r);
            },
            X: function (t, e, n) {
              return E(t, r, e, n);
            },
            y: Gu,
            Y: Ku,
            Z: Zu,
            '%': ls,
          };
        function x(t, e) {
          return function (n) {
            var r,
              i,
              a,
              o = [],
              l = -1,
              u = 0,
              s = t.length;
            for (n instanceof Date || (n = new Date(+n)); ++l < s; )
              37 === t.charCodeAt(l) &&
                (o.push(t.slice(u, l)),
                null != (i = Iu[(r = t.charAt(++l))])
                  ? (r = t.charAt(++l))
                  : (i = 'e' === r ? ' ' : '0'),
                (a = e[r]) && (r = a(n, i)),
                o.push(r),
                (u = l + 1));
            return o.push(t.slice(u, l)), o.join('');
          };
        }
        function k(t, e) {
          return function (n) {
            var r,
              i,
              a = Lu(1900);
            if (E(a, t, (n += ''), 0) != n.length) return null;
            if ('Q' in a) return new Date(a.Q);
            if (('p' in a && (a.H = (a.H % 12) + 12 * a.p), 'V' in a)) {
              if (a.V < 1 || a.V > 53) return null;
              'w' in a || (a.w = 1),
                'Z' in a
                  ? ((i = (r = Au(Lu(a.y))).getUTCDay()),
                    (r = i > 4 || 0 === i ? wu.ceil(r) : wu(r)),
                    (r = Mu.offset(r, 7 * (a.V - 1))),
                    (a.y = r.getUTCFullYear()),
                    (a.m = r.getUTCMonth()),
                    (a.d = r.getUTCDate() + ((a.w + 6) % 7)))
                  : ((i = (r = e(Lu(a.y))).getDay()),
                    (r = i > 4 || 0 === i ? lu.ceil(r) : lu(r)),
                    (r = du.offset(r, 7 * (a.V - 1))),
                    (a.y = r.getFullYear()),
                    (a.m = r.getMonth()),
                    (a.d = r.getDate() + ((a.w + 6) % 7)));
            } else
              ('W' in a || 'U' in a) &&
                ('w' in a || (a.w = 'u' in a ? a.u % 7 : 'W' in a ? 1 : 0),
                (i = 'Z' in a ? Au(Lu(a.y)).getUTCDay() : e(Lu(a.y)).getDay()),
                (a.m = 0),
                (a.d =
                  'W' in a
                    ? ((a.w + 6) % 7) + 7 * a.W - ((i + 5) % 7)
                    : a.w + 7 * a.U - ((i + 6) % 7)));
            return 'Z' in a
              ? ((a.H += (a.Z / 100) | 0), (a.M += a.Z % 100), Au(a))
              : e(a);
          };
        }
        function E(t, e, n, r) {
          for (var i, a, o = 0, l = e.length, u = n.length; o < l; ) {
            if (r >= u) return -1;
            if (37 === (i = e.charCodeAt(o++))) {
              if (
                ((i = e.charAt(o++)),
                !(a = w[i in Iu ? e.charAt(o++) : i]) || (r = a(t, n, r)) < 0)
              )
                return -1;
            } else if (i != n.charCodeAt(r++)) return -1;
          }
          return r;
        }
        return (
          (_.x = x(n, _)),
          (_.X = x(r, _)),
          (_.c = x(e, _)),
          (b.x = x(n, b)),
          (b.X = x(r, b)),
          (b.c = x(e, b)),
          {
            format: function (t) {
              var e = x((t += ''), _);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
            parse: function (t) {
              var e = k((t += ''), Ou);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
            utcFormat: function (t) {
              var e = x((t += ''), b);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
            utcParse: function (t) {
              var e = k(t, Au);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
          }
        );
      })(t)),
        Ru.format,
        Ru.parse,
        (Fu = Ru.utcFormat),
        (zu = Ru.utcParse);
    })({
      dateTime: '%x, %X',
      date: '%-m/%-d/%Y',
      time: '%-I:%M:%S %p',
      periods: ['AM', 'PM'],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    });
    Date.prototype.toISOString || Fu('%Y-%m-%dT%H:%M:%S.%LZ');
    +new Date('2000-01-01T00:00:00.000Z') || zu('%Y-%m-%dT%H:%M:%S.%LZ');
    var Vs = Jl(
        function (t) {
          t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
        },
        function (t, e) {
          t.setUTCMonth(t.getUTCMonth() + e);
        },
        function (t, e) {
          return (
            e.getUTCMonth() -
            t.getUTCMonth() +
            12 * (e.getUTCFullYear() - t.getUTCFullYear())
          );
        },
        function (t) {
          return t.getUTCMonth();
        }
      ),
      Xs =
        (Vs.range,
        Jl(
          function (t) {
            t.setUTCMinutes(0, 0, 0);
          },
          function (t, e) {
            t.setTime(+t + 36e5 * e);
          },
          function (t, e) {
            return (e - t) / 36e5;
          },
          function (t) {
            return t.getUTCHours();
          }
        )),
      Qs =
        (Xs.range,
        Jl(
          function (t) {
            t.setUTCSeconds(0, 0);
          },
          function (t, e) {
            t.setTime(+t + e * ru);
          },
          function (t, e) {
            return (e - t) / ru;
          },
          function (t) {
            return t.getUTCMinutes();
          }
        ));
    Qs.range;
    var Ks = (function (t) {
        for (var e = (t.length / 6) | 0, n = new Array(e), r = 0; r < e; )
          n[r] = '#' + t.slice(6 * r, 6 * ++r);
        return n;
      })('1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf'),
      Gs = function (t) {
        return function () {
          return t;
        };
      },
      Zs =
        (Math.abs,
        Math.atan2,
        Math.cos,
        Math.max,
        Math.min,
        Math.sin,
        Math.sqrt,
        1e-12),
      Js = Math.PI,
      tc = 2 * Js;
    function ec(t) {
      this._context = t;
    }
    ec.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        this._point = 0;
      },
      lineEnd: function () {
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
          default:
            this._context.lineTo(t, e);
        }
      },
    };
    var nc = function (t) {
      return new ec(t);
    };
    function rc(t) {
      return t[0];
    }
    function ic(t) {
      return t[1];
    }
    var ac = function () {
      var t = rc,
        e = ic,
        n = Gs(!0),
        r = null,
        i = nc,
        a = null;
      function o(o) {
        var l,
          u,
          s,
          c = o.length,
          f = !1;
        for (null == r && (a = i((s = zi()))), l = 0; l <= c; ++l)
          !(l < c && n((u = o[l]), l, o)) === f &&
            ((f = !f) ? a.lineStart() : a.lineEnd()),
            f && a.point(+t(u, l, o), +e(u, l, o));
        if (s) return (a = null), s + '' || null;
      }
      return (
        (o.x = function (e) {
          return arguments.length
            ? ((t = 'function' == typeof e ? e : Gs(+e)), o)
            : t;
        }),
        (o.y = function (t) {
          return arguments.length
            ? ((e = 'function' == typeof t ? t : Gs(+t)), o)
            : e;
        }),
        (o.defined = function (t) {
          return arguments.length
            ? ((n = 'function' == typeof t ? t : Gs(!!t)), o)
            : n;
        }),
        (o.curve = function (t) {
          return arguments.length ? ((i = t), null != r && (a = i(r)), o) : i;
        }),
        (o.context = function (t) {
          return arguments.length
            ? (null == t ? (r = a = null) : (a = i((r = t))), o)
            : r;
        }),
        o
      );
    };
    lc(nc);
    function oc(t) {
      this._curve = t;
    }
    function lc(t) {
      function e(e) {
        return new oc(t(e));
      }
      return (e._curve = t), e;
    }
    oc.prototype = {
      areaStart: function () {
        this._curve.areaStart();
      },
      areaEnd: function () {
        this._curve.areaEnd();
      },
      lineStart: function () {
        this._curve.lineStart();
      },
      lineEnd: function () {
        this._curve.lineEnd();
      },
      point: function (t, e) {
        this._curve.point(e * Math.sin(t), e * -Math.cos(t));
      },
    };
    Array.prototype.slice;
    Math.sqrt(1 / 3);
    var uc = Math.sin(Js / 10) / Math.sin((7 * Js) / 10),
      sc =
        (Math.sin(tc / 10),
        Math.cos(tc / 10),
        Math.sqrt(3),
        Math.sqrt(3),
        Math.sqrt(12),
        function () {});
    function cc(t, e, n) {
      t._context.bezierCurveTo(
        (2 * t._x0 + t._x1) / 3,
        (2 * t._y0 + t._y1) / 3,
        (t._x0 + 2 * t._x1) / 3,
        (t._y0 + 2 * t._y1) / 3,
        (t._x0 + 4 * t._x1 + e) / 6,
        (t._y0 + 4 * t._y1 + n) / 6
      );
    }
    function fc(t) {
      this._context = t;
    }
    fc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 3:
            cc(this, this._x1, this._y1);
          case 2:
            this._context.lineTo(this._x1, this._y1);
        }
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._context.lineTo(
                (5 * this._x0 + this._x1) / 6,
                (5 * this._y0 + this._y1) / 6
              );
          default:
            cc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = e);
      },
    };
    function hc(t) {
      this._context = t;
    }
    hc.prototype = {
      areaStart: sc,
      areaEnd: sc,
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1:
            this._context.moveTo(this._x2, this._y2), this._context.closePath();
            break;
          case 2:
            this._context.moveTo(
              (this._x2 + 2 * this._x3) / 3,
              (this._y2 + 2 * this._y3) / 3
            ),
              this._context.lineTo(
                (this._x3 + 2 * this._x2) / 3,
                (this._y3 + 2 * this._y2) / 3
              ),
              this._context.closePath();
            break;
          case 3:
            this.point(this._x2, this._y2),
              this.point(this._x3, this._y3),
              this.point(this._x4, this._y4);
        }
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1), (this._x2 = t), (this._y2 = e);
            break;
          case 1:
            (this._point = 2), (this._x3 = t), (this._y3 = e);
            break;
          case 2:
            (this._point = 3),
              (this._x4 = t),
              (this._y4 = e),
              this._context.moveTo(
                (this._x0 + 4 * this._x1 + t) / 6,
                (this._y0 + 4 * this._y1 + e) / 6
              );
            break;
          default:
            cc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = e);
      },
    };
    function pc(t) {
      this._context = t;
    }
    pc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
      },
      lineEnd: function () {
        (this._line || (0 !== this._line && 3 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            var n = (this._x0 + 4 * this._x1 + t) / 6,
              r = (this._y0 + 4 * this._y1 + e) / 6;
            this._line
              ? this._context.lineTo(n, r)
              : this._context.moveTo(n, r);
            break;
          case 3:
            this._point = 4;
          default:
            cc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = e);
      },
    };
    function dc(t, e) {
      (this._basis = new fc(t)), (this._beta = e);
    }
    dc.prototype = {
      lineStart: function () {
        (this._x = []), (this._y = []), this._basis.lineStart();
      },
      lineEnd: function () {
        var t = this._x,
          e = this._y,
          n = t.length - 1;
        if (n > 0)
          for (
            var r, i = t[0], a = e[0], o = t[n] - i, l = e[n] - a, u = -1;
            ++u <= n;

          )
            (r = u / n),
              this._basis.point(
                this._beta * t[u] + (1 - this._beta) * (i + r * o),
                this._beta * e[u] + (1 - this._beta) * (a + r * l)
              );
        (this._x = this._y = null), this._basis.lineEnd();
      },
      point: function (t, e) {
        this._x.push(+t), this._y.push(+e);
      },
    };
    (function t(e) {
      function n(t) {
        return 1 === e ? new fc(t) : new dc(t, e);
      }
      return (
        (n.beta = function (e) {
          return t(+e);
        }),
        n
      );
    })(0.85);
    function mc(t, e, n) {
      t._context.bezierCurveTo(
        t._x1 + t._k * (t._x2 - t._x0),
        t._y1 + t._k * (t._y2 - t._y0),
        t._x2 + t._k * (t._x1 - e),
        t._y2 + t._k * (t._y1 - n),
        t._x2,
        t._y2
      );
    }
    function yc(t, e) {
      (this._context = t), (this._k = (1 - e) / 6);
    }
    yc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            mc(this, this._x1, this._y1);
        }
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            (this._point = 2), (this._x1 = t), (this._y1 = e);
            break;
          case 2:
            this._point = 3;
          default:
            mc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return new yc(t, e);
      }
      return (
        (n.tension = function (e) {
          return t(+e);
        }),
        n
      );
    })(0);
    function vc(t, e) {
      (this._context = t), (this._k = (1 - e) / 6);
    }
    vc.prototype = {
      areaStart: sc,
      areaEnd: sc,
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1:
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          case 2:
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          case 3:
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
        }
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1), (this._x3 = t), (this._y3 = e);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = t), (this._y4 = e));
            break;
          case 2:
            (this._point = 3), (this._x5 = t), (this._y5 = e);
            break;
          default:
            mc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return new vc(t, e);
      }
      return (
        (n.tension = function (e) {
          return t(+e);
        }),
        n
      );
    })(0);
    function gc(t, e) {
      (this._context = t), (this._k = (1 - e) / 6);
    }
    gc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        (this._line || (0 !== this._line && 3 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            mc(this, t, e);
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return new gc(t, e);
      }
      return (
        (n.tension = function (e) {
          return t(+e);
        }),
        n
      );
    })(0);
    function _c(t, e, n) {
      var r = t._x1,
        i = t._y1,
        a = t._x2,
        o = t._y2;
      if (t._l01_a > Zs) {
        var l = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
          u = 3 * t._l01_a * (t._l01_a + t._l12_a);
        (r = (r * l - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / u),
          (i = (i * l - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / u);
      }
      if (t._l23_a > Zs) {
        var s = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
          c = 3 * t._l23_a * (t._l23_a + t._l12_a);
        (a = (a * s + t._x1 * t._l23_2a - e * t._l12_2a) / c),
          (o = (o * s + t._y1 * t._l23_2a - n * t._l12_2a) / c);
      }
      t._context.bezierCurveTo(r, i, a, o, t._x2, t._y2);
    }
    function bc(t, e) {
      (this._context = t), (this._alpha = e);
    }
    bc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            this.point(this._x2, this._y2);
        }
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var n = this._x2 - t,
            r = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(n * n + r * r, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
          default:
            _c(this, t, e);
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return e ? new bc(t, e) : new yc(t, 0);
      }
      return (
        (n.alpha = function (e) {
          return t(+e);
        }),
        n
      );
    })(0.5);
    function wc(t, e) {
      (this._context = t), (this._alpha = e);
    }
    wc.prototype = {
      areaStart: sc,
      areaEnd: sc,
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
          (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1:
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          case 2:
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          case 3:
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
        }
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var n = this._x2 - t,
            r = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(n * n + r * r, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1), (this._x3 = t), (this._y3 = e);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = t), (this._y4 = e));
            break;
          case 2:
            (this._point = 3), (this._x5 = t), (this._y5 = e);
            break;
          default:
            _c(this, t, e);
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return e ? new wc(t, e) : new vc(t, 0);
      }
      return (
        (n.alpha = function (e) {
          return t(+e);
        }),
        n
      );
    })(0.5);
    function xc(t, e) {
      (this._context = t), (this._alpha = e);
    }
    xc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
      },
      lineEnd: function () {
        (this._line || (0 !== this._line && 3 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var n = this._x2 - t,
            r = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(n * n + r * r, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            _c(this, t, e);
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    (function t(e) {
      function n(t) {
        return e ? new xc(t, e) : new gc(t, 0);
      }
      return (
        (n.alpha = function (e) {
          return t(+e);
        }),
        n
      );
    })(0.5);
    function kc(t) {
      this._context = t;
    }
    kc.prototype = {
      areaStart: sc,
      areaEnd: sc,
      lineStart: function () {
        this._point = 0;
      },
      lineEnd: function () {
        this._point && this._context.closePath();
      },
      point: function (t, e) {
        (t = +t),
          (e = +e),
          this._point
            ? this._context.lineTo(t, e)
            : ((this._point = 1), this._context.moveTo(t, e));
      },
    };
    function Ec(t) {
      return t < 0 ? -1 : 1;
    }
    function Tc(t, e, n) {
      var r = t._x1 - t._x0,
        i = e - t._x1,
        a = (t._y1 - t._y0) / (r || (i < 0 && -0)),
        o = (n - t._y1) / (i || (r < 0 && -0)),
        l = (a * i + o * r) / (r + i);
      return (
        (Ec(a) + Ec(o)) *
          Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(l)) || 0
      );
    }
    function Sc(t, e) {
      var n = t._x1 - t._x0;
      return n ? ((3 * (t._y1 - t._y0)) / n - e) / 2 : e;
    }
    function Cc(t, e, n) {
      var r = t._x0,
        i = t._y0,
        a = t._x1,
        o = t._y1,
        l = (a - r) / 3;
      t._context.bezierCurveTo(r + l, i + l * e, a - l, o - l * n, a, o);
    }
    function Mc(t) {
      this._context = t;
    }
    function Nc(t) {
      this._context = new Pc(t);
    }
    function Pc(t) {
      this._context = t;
    }
    function Oc(t) {
      this._context = t;
    }
    function Ac(t) {
      var e,
        n,
        r = t.length - 1,
        i = new Array(r),
        a = new Array(r),
        o = new Array(r);
      for (i[0] = 0, a[0] = 2, o[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e)
        (i[e] = 1), (a[e] = 4), (o[e] = 4 * t[e] + 2 * t[e + 1]);
      for (
        i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * t[r - 1] + t[r], e = 1;
        e < r;
        ++e
      )
        (n = i[e] / a[e - 1]), (a[e] -= n), (o[e] -= n * o[e - 1]);
      for (i[r - 1] = o[r - 1] / a[r - 1], e = r - 2; e >= 0; --e)
        i[e] = (o[e] - i[e + 1]) / a[e];
      for (a[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e)
        a[e] = 2 * t[e + 1] - i[e + 1];
      return [i, a];
    }
    (Mc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x1, this._y1);
            break;
          case 3:
            Cc(this, this._t0, Sc(this, this._t0));
        }
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        var n = NaN;
        if (((e = +e), (t = +t) !== this._x1 || e !== this._y1)) {
          switch (this._point) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, e)
                  : this._context.moveTo(t, e);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3), Cc(this, Sc(this, (n = Tc(this, t, e))), n);
              break;
            default:
              Cc(this, this._t0, (n = Tc(this, t, e)));
          }
          (this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = e),
            (this._t0 = n);
        }
      },
    }),
      ((Nc.prototype = Object.create(Mc.prototype)).point = function (t, e) {
        Mc.prototype.point.call(this, e, t);
      }),
      (Pc.prototype = {
        moveTo: function (t, e) {
          this._context.moveTo(e, t);
        },
        closePath: function () {
          this._context.closePath();
        },
        lineTo: function (t, e) {
          this._context.lineTo(e, t);
        },
        bezierCurveTo: function (t, e, n, r, i, a) {
          this._context.bezierCurveTo(e, t, r, n, a, i);
        },
      }),
      (Oc.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x = []), (this._y = []);
        },
        lineEnd: function () {
          var t = this._x,
            e = this._y,
            n = t.length;
          if (n)
            if (
              (this._line
                ? this._context.lineTo(t[0], e[0])
                : this._context.moveTo(t[0], e[0]),
              2 === n)
            )
              this._context.lineTo(t[1], e[1]);
            else
              for (var r = Ac(t), i = Ac(e), a = 0, o = 1; o < n; ++a, ++o)
                this._context.bezierCurveTo(
                  r[0][a],
                  i[0][a],
                  r[1][a],
                  i[1][a],
                  t[o],
                  e[o]
                );
          (this._line || (0 !== this._line && 1 === n)) &&
            this._context.closePath(),
            (this._line = 1 - this._line),
            (this._x = this._y = null);
        },
        point: function (t, e) {
          this._x.push(+t), this._y.push(+e);
        },
      });
    function Lc(t, e) {
      (this._context = t), (this._t = e);
    }
    Lc.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x = this._y = NaN), (this._point = 0);
      },
      lineEnd: function () {
        0 < this._t &&
          this._t < 1 &&
          2 === this._point &&
          this._context.lineTo(this._x, this._y),
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
          this._line >= 0 &&
            ((this._t = 1 - this._t), (this._line = 1 - this._line));
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
          default:
            if (this._t <= 0)
              this._context.lineTo(this._x, e), this._context.lineTo(t, e);
            else {
              var n = this._x * (1 - this._t) + t * this._t;
              this._context.lineTo(n, this._y), this._context.lineTo(n, e);
            }
        }
        (this._x = t), (this._y = e);
      },
    };
    function Rc() {
      this._ = null;
    }
    function Fc(t) {
      t.U = t.C = t.L = t.R = t.P = t.N = null;
    }
    function zc(t, e) {
      var n = e,
        r = e.R,
        i = n.U;
      i ? (i.L === n ? (i.L = r) : (i.R = r)) : (t._ = r),
        (r.U = i),
        (n.U = r),
        (n.R = r.L),
        n.R && (n.R.U = n),
        (r.L = n);
    }
    function Ic(t, e) {
      var n = e,
        r = e.L,
        i = n.U;
      i ? (i.L === n ? (i.L = r) : (i.R = r)) : (t._ = r),
        (r.U = i),
        (n.U = r),
        (n.L = r.R),
        n.L && (n.L.U = n),
        (r.R = n);
    }
    function jc(t) {
      for (; t.L; ) t = t.L;
      return t;
    }
    Rc.prototype = {
      constructor: Rc,
      insert: function (t, e) {
        var n, r, i;
        if (t) {
          if (((e.P = t), (e.N = t.N), t.N && (t.N.P = e), (t.N = e), t.R)) {
            for (t = t.R; t.L; ) t = t.L;
            t.L = e;
          } else t.R = e;
          n = t;
        } else
          this._
            ? ((t = jc(this._)),
              (e.P = null),
              (e.N = t),
              (t.P = t.L = e),
              (n = t))
            : ((e.P = e.N = null), (this._ = e), (n = null));
        for (e.L = e.R = null, e.U = n, e.C = !0, t = e; n && n.C; )
          n === (r = n.U).L
            ? (i = r.R) && i.C
              ? ((n.C = i.C = !1), (r.C = !0), (t = r))
              : (t === n.R && (zc(this, n), (n = (t = n).U)),
                (n.C = !1),
                (r.C = !0),
                Ic(this, r))
            : (i = r.L) && i.C
            ? ((n.C = i.C = !1), (r.C = !0), (t = r))
            : (t === n.L && (Ic(this, n), (n = (t = n).U)),
              (n.C = !1),
              (r.C = !0),
              zc(this, r)),
            (n = t.U);
        this._.C = !1;
      },
      remove: function (t) {
        t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), (t.N = t.P = null);
        var e,
          n,
          r,
          i = t.U,
          a = t.L,
          o = t.R;
        if (
          ((n = a ? (o ? jc(o) : a) : o),
          i ? (i.L === t ? (i.L = n) : (i.R = n)) : (this._ = n),
          a && o
            ? ((r = n.C),
              (n.C = t.C),
              (n.L = a),
              (a.U = n),
              n !== o
                ? ((i = n.U),
                  (n.U = t.U),
                  (t = n.R),
                  (i.L = t),
                  (n.R = o),
                  (o.U = n))
                : ((n.U = i), (i = n), (t = n.R)))
            : ((r = t.C), (t = n)),
          t && (t.U = i),
          !r)
        )
          if (t && t.C) t.C = !1;
          else {
            do {
              if (t === this._) break;
              if (t === i.L) {
                if (
                  ((e = i.R).C &&
                    ((e.C = !1), (i.C = !0), zc(this, i), (e = i.R)),
                  (e.L && e.L.C) || (e.R && e.R.C))
                ) {
                  (e.R && e.R.C) ||
                    ((e.L.C = !1), (e.C = !0), Ic(this, e), (e = i.R)),
                    (e.C = i.C),
                    (i.C = e.R.C = !1),
                    zc(this, i),
                    (t = this._);
                  break;
                }
              } else if (
                ((e = i.L).C &&
                  ((e.C = !1), (i.C = !0), Ic(this, i), (e = i.L)),
                (e.L && e.L.C) || (e.R && e.R.C))
              ) {
                (e.L && e.L.C) ||
                  ((e.R.C = !1), (e.C = !0), zc(this, e), (e = i.L)),
                  (e.C = i.C),
                  (i.C = e.L.C = !1),
                  Ic(this, i),
                  (t = this._);
                break;
              }
              (e.C = !0), (t = i), (i = i.U);
            } while (!t.C);
            t && (t.C = !1);
          }
      },
    };
    var Uc = Rc;
    function Dc(t, e, n, r) {
      var i = [null, null],
        a = ff.push(i) - 1;
      return (
        (i.left = t),
        (i.right = e),
        n && Wc(i, t, e, n),
        r && Wc(i, e, t, r),
        sf[t.index].halfedges.push(a),
        sf[e.index].halfedges.push(a),
        i
      );
    }
    function Hc(t, e, n) {
      var r = [e, n];
      return (r.left = t), r;
    }
    function Wc(t, e, n, r) {
      t[0] || t[1]
        ? t.left === n
          ? (t[1] = r)
          : (t[0] = r)
        : ((t[0] = r), (t.left = e), (t.right = n));
    }
    function $c(t, e, n, r, i) {
      var a,
        o = t[0],
        l = t[1],
        u = o[0],
        s = o[1],
        c = 0,
        f = 1,
        h = l[0] - u,
        p = l[1] - s;
      if (((a = e - u), h || !(a > 0))) {
        if (((a /= h), h < 0)) {
          if (a < c) return;
          a < f && (f = a);
        } else if (h > 0) {
          if (a > f) return;
          a > c && (c = a);
        }
        if (((a = r - u), h || !(a < 0))) {
          if (((a /= h), h < 0)) {
            if (a > f) return;
            a > c && (c = a);
          } else if (h > 0) {
            if (a < c) return;
            a < f && (f = a);
          }
          if (((a = n - s), p || !(a > 0))) {
            if (((a /= p), p < 0)) {
              if (a < c) return;
              a < f && (f = a);
            } else if (p > 0) {
              if (a > f) return;
              a > c && (c = a);
            }
            if (((a = i - s), p || !(a < 0))) {
              if (((a /= p), p < 0)) {
                if (a > f) return;
                a > c && (c = a);
              } else if (p > 0) {
                if (a < c) return;
                a < f && (f = a);
              }
              return (
                !(c > 0 || f < 1) ||
                (c > 0 && (t[0] = [u + c * h, s + c * p]),
                f < 1 && (t[1] = [u + f * h, s + f * p]),
                !0)
              );
            }
          }
        }
      }
    }
    function Yc(t, e, n, r, i) {
      var a = t[1];
      if (a) return !0;
      var o,
        l,
        u = t[0],
        s = t.left,
        c = t.right,
        f = s[0],
        h = s[1],
        p = c[0],
        d = c[1],
        m = (f + p) / 2,
        y = (h + d) / 2;
      if (d === h) {
        if (m < e || m >= r) return;
        if (f > p) {
          if (u) {
            if (u[1] >= i) return;
          } else u = [m, n];
          a = [m, i];
        } else {
          if (u) {
            if (u[1] < n) return;
          } else u = [m, i];
          a = [m, n];
        }
      } else if (((l = y - (o = (f - p) / (d - h)) * m), o < -1 || o > 1))
        if (f > p) {
          if (u) {
            if (u[1] >= i) return;
          } else u = [(n - l) / o, n];
          a = [(i - l) / o, i];
        } else {
          if (u) {
            if (u[1] < n) return;
          } else u = [(i - l) / o, i];
          a = [(n - l) / o, n];
        }
      else if (h < d) {
        if (u) {
          if (u[0] >= r) return;
        } else u = [e, o * e + l];
        a = [r, o * r + l];
      } else {
        if (u) {
          if (u[0] < e) return;
        } else u = [r, o * r + l];
        a = [e, o * e + l];
      }
      return (t[0] = u), (t[1] = a), !0;
    }
    function Bc(t, e) {
      var n = t.site,
        r = e.left,
        i = e.right;
      return (
        n === i && ((i = r), (r = n)),
        i
          ? Math.atan2(i[1] - r[1], i[0] - r[0])
          : (n === r ? ((r = e[1]), (i = e[0])) : ((r = e[0]), (i = e[1])),
            Math.atan2(r[0] - i[0], i[1] - r[1]))
      );
    }
    function qc(t, e) {
      return e[+(e.left !== t.site)];
    }
    function Vc(t, e) {
      return e[+(e.left === t.site)];
    }
    var Xc,
      Qc = [];
    function Kc() {
      Fc(this), (this.x = this.y = this.arc = this.site = this.cy = null);
    }
    function Gc(t) {
      var e = t.P,
        n = t.N;
      if (e && n) {
        var r = e.site,
          i = t.site,
          a = n.site;
        if (r !== a) {
          var o = i[0],
            l = i[1],
            u = r[0] - o,
            s = r[1] - l,
            c = a[0] - o,
            f = a[1] - l,
            h = 2 * (u * f - s * c);
          if (!(h >= -pf)) {
            var p = u * u + s * s,
              d = c * c + f * f,
              m = (f * p - s * d) / h,
              y = (u * d - c * p) / h,
              v = Qc.pop() || new Kc();
            (v.arc = t),
              (v.site = i),
              (v.x = m + o),
              (v.y = (v.cy = y + l) + Math.sqrt(m * m + y * y)),
              (t.circle = v);
            for (var g = null, _ = cf._; _; )
              if (v.y < _.y || (v.y === _.y && v.x <= _.x)) {
                if (!_.L) {
                  g = _.P;
                  break;
                }
                _ = _.L;
              } else {
                if (!_.R) {
                  g = _;
                  break;
                }
                _ = _.R;
              }
            cf.insert(g, v), g || (Xc = v);
          }
        }
      }
    }
    function Zc(t) {
      var e = t.circle;
      e &&
        (e.P || (Xc = e.N), cf.remove(e), Qc.push(e), Fc(e), (t.circle = null));
    }
    var Jc = [];
    function tf() {
      Fc(this), (this.edge = this.site = this.circle = null);
    }
    function ef(t) {
      var e = Jc.pop() || new tf();
      return (e.site = t), e;
    }
    function nf(t) {
      Zc(t), uf.remove(t), Jc.push(t), Fc(t);
    }
    function rf(t) {
      var e = t.circle,
        n = e.x,
        r = e.cy,
        i = [n, r],
        a = t.P,
        o = t.N,
        l = [t];
      nf(t);
      for (
        var u = a;
        u.circle &&
        Math.abs(n - u.circle.x) < hf &&
        Math.abs(r - u.circle.cy) < hf;

      )
        (a = u.P), l.unshift(u), nf(u), (u = a);
      l.unshift(u), Zc(u);
      for (
        var s = o;
        s.circle &&
        Math.abs(n - s.circle.x) < hf &&
        Math.abs(r - s.circle.cy) < hf;

      )
        (o = s.N), l.push(s), nf(s), (s = o);
      l.push(s), Zc(s);
      var c,
        f = l.length;
      for (c = 1; c < f; ++c)
        (s = l[c]), (u = l[c - 1]), Wc(s.edge, u.site, s.site, i);
      (u = l[0]),
        ((s = l[f - 1]).edge = Dc(u.site, s.site, null, i)),
        Gc(u),
        Gc(s);
    }
    function af(t) {
      for (var e, n, r, i, a = t[0], o = t[1], l = uf._; l; )
        if ((r = of(l, o) - a) > hf) l = l.L;
        else {
          if (!((i = a - lf(l, o)) > hf)) {
            r > -hf
              ? ((e = l.P), (n = l))
              : i > -hf
              ? ((e = l), (n = l.N))
              : (e = n = l);
            break;
          }
          if (!l.R) {
            e = l;
            break;
          }
          l = l.R;
        }
      !(function (t) {
        sf[t.index] = { site: t, halfedges: [] };
      })(t);
      var u = ef(t);
      if ((uf.insert(e, u), e || n)) {
        if (e === n)
          return (
            Zc(e),
            (n = ef(e.site)),
            uf.insert(u, n),
            (u.edge = n.edge = Dc(e.site, u.site)),
            Gc(e),
            void Gc(n)
          );
        if (n) {
          Zc(e), Zc(n);
          var s = e.site,
            c = s[0],
            f = s[1],
            h = t[0] - c,
            p = t[1] - f,
            d = n.site,
            m = d[0] - c,
            y = d[1] - f,
            v = 2 * (h * y - p * m),
            g = h * h + p * p,
            _ = m * m + y * y,
            b = [(y * g - p * _) / v + c, (h * _ - m * g) / v + f];
          Wc(n.edge, s, d, b),
            (u.edge = Dc(s, t, null, b)),
            (n.edge = Dc(t, d, null, b)),
            Gc(e),
            Gc(n);
        } else u.edge = Dc(e.site, u.site);
      }
    }
    function of(t, e) {
      var n = t.site,
        r = n[0],
        i = n[1],
        a = i - e;
      if (!a) return r;
      var o = t.P;
      if (!o) return -1 / 0;
      var l = (n = o.site)[0],
        u = n[1],
        s = u - e;
      if (!s) return l;
      var c = l - r,
        f = 1 / a - 1 / s,
        h = c / s;
      return f
        ? (-h +
            Math.sqrt(
              h * h - 2 * f * ((c * c) / (-2 * s) - u + s / 2 + i - a / 2)
            )) /
            f +
            r
        : (r + l) / 2;
    }
    function lf(t, e) {
      var n = t.N;
      if (n) return of(n, e);
      var r = t.site;
      return r[1] === e ? r[0] : 1 / 0;
    }
    var uf,
      sf,
      cf,
      ff,
      hf = 1e-6,
      pf = 1e-12;
    function df(t, e) {
      return e[1] - t[1] || e[0] - t[0];
    }
    function mf(t, e) {
      var n,
        r,
        i,
        a = t.sort(df).pop();
      for (ff = [], sf = new Array(t.length), uf = new Uc(), cf = new Uc(); ; )
        if (((i = Xc), a && (!i || a[1] < i.y || (a[1] === i.y && a[0] < i.x))))
          (a[0] === n && a[1] === r) || (af(a), (n = a[0]), (r = a[1])),
            (a = t.pop());
        else {
          if (!i) break;
          rf(i.arc);
        }
      if (
        ((function () {
          for (var t, e, n, r, i = 0, a = sf.length; i < a; ++i)
            if ((t = sf[i]) && (r = (e = t.halfedges).length)) {
              var o = new Array(r),
                l = new Array(r);
              for (n = 0; n < r; ++n) (o[n] = n), (l[n] = Bc(t, ff[e[n]]));
              for (
                o.sort(function (t, e) {
                  return l[e] - l[t];
                }),
                  n = 0;
                n < r;
                ++n
              )
                l[n] = e[o[n]];
              for (n = 0; n < r; ++n) e[n] = l[n];
            }
        })(),
        e)
      ) {
        var o = +e[0][0],
          l = +e[0][1],
          u = +e[1][0],
          s = +e[1][1];
        !(function (t, e, n, r) {
          for (var i, a = ff.length; a--; )
            (Yc((i = ff[a]), t, e, n, r) &&
              $c(i, t, e, n, r) &&
              (Math.abs(i[0][0] - i[1][0]) > hf ||
                Math.abs(i[0][1] - i[1][1]) > hf)) ||
              delete ff[a];
        })(o, l, u, s),
          (function (t, e, n, r) {
            var i,
              a,
              o,
              l,
              u,
              s,
              c,
              f,
              h,
              p,
              d,
              m,
              y = sf.length,
              v = !0;
            for (i = 0; i < y; ++i)
              if ((a = sf[i])) {
                for (o = a.site, l = (u = a.halfedges).length; l--; )
                  ff[u[l]] || u.splice(l, 1);
                for (l = 0, s = u.length; l < s; )
                  (d = (p = Vc(a, ff[u[l]]))[0]),
                    (m = p[1]),
                    (f = (c = qc(a, ff[u[++l % s]]))[0]),
                    (h = c[1]),
                    (Math.abs(d - f) > hf || Math.abs(m - h) > hf) &&
                      (u.splice(
                        l,
                        0,
                        ff.push(
                          Hc(
                            o,
                            p,
                            Math.abs(d - t) < hf && r - m > hf
                              ? [t, Math.abs(f - t) < hf ? h : r]
                              : Math.abs(m - r) < hf && n - d > hf
                              ? [Math.abs(h - r) < hf ? f : n, r]
                              : Math.abs(d - n) < hf && m - e > hf
                              ? [n, Math.abs(f - n) < hf ? h : e]
                              : Math.abs(m - e) < hf && d - t > hf
                              ? [Math.abs(h - e) < hf ? f : t, e]
                              : null
                          )
                        ) - 1
                      ),
                      ++s);
                s && (v = !1);
              }
            if (v) {
              var g,
                _,
                b,
                w = 1 / 0;
              for (i = 0, v = null; i < y; ++i)
                (a = sf[i]) &&
                  (b = (g = (o = a.site)[0] - t) * g + (_ = o[1] - e) * _) <
                    w &&
                  ((w = b), (v = a));
              if (v) {
                var x = [t, e],
                  k = [t, r],
                  E = [n, r],
                  T = [n, e];
                v.halfedges.push(
                  ff.push(Hc((o = v.site), x, k)) - 1,
                  ff.push(Hc(o, k, E)) - 1,
                  ff.push(Hc(o, E, T)) - 1,
                  ff.push(Hc(o, T, x)) - 1
                );
              }
            }
            for (i = 0; i < y; ++i)
              (a = sf[i]) && (a.halfedges.length || delete sf[i]);
          })(o, l, u, s);
      }
      (this.edges = ff), (this.cells = sf), (uf = cf = ff = sf = null);
    }
    mf.prototype = {
      constructor: mf,
      polygons: function () {
        var t = this.edges;
        return this.cells.map(function (e) {
          var n = e.halfedges.map(function (n) {
            return qc(e, t[n]);
          });
          return (n.data = e.site.data), n;
        });
      },
      triangles: function () {
        var t = [],
          e = this.edges;
        return (
          this.cells.forEach(function (n, r) {
            if ((a = (i = n.halfedges).length))
              for (
                var i,
                  a,
                  o,
                  l,
                  u,
                  s,
                  c = n.site,
                  f = -1,
                  h = e[i[a - 1]],
                  p = h.left === c ? h.right : h.left;
                ++f < a;

              )
                (o = p),
                  (p = (h = e[i[f]]).left === c ? h.right : h.left),
                  o &&
                    p &&
                    r < o.index &&
                    r < p.index &&
                    ((u = o),
                    (s = p),
                    ((l = c)[0] - s[0]) * (u[1] - l[1]) -
                      (l[0] - u[0]) * (s[1] - l[1]) <
                      0) &&
                    t.push([c.data, o.data, p.data]);
          }),
          t
        );
      },
      links: function () {
        return this.edges
          .filter(function (t) {
            return t.right;
          })
          .map(function (t) {
            return { source: t.left.data, target: t.right.data };
          });
      },
      find: function (t, e, n) {
        for (
          var r, i, a = this, o = a._found || 0, l = a.cells.length;
          !(i = a.cells[o]);

        )
          if (++o >= l) return null;
        var u = t - i.site[0],
          s = e - i.site[1],
          c = u * u + s * s;
        do {
          (i = a.cells[(r = o)]),
            (o = null),
            i.halfedges.forEach(function (n) {
              var r = a.edges[n],
                l = r.left;
              if ((l !== i.site && l) || (l = r.right)) {
                var u = t - l[0],
                  s = e - l[1],
                  f = u * u + s * s;
                f < c && ((c = f), (o = l.index));
              }
            });
        } while (null !== o);
        return (a._found = r), null == n || c <= n * n ? i.site : null;
      },
    };
    function yf(t, e, n) {
      (this.k = t), (this.x = e), (this.y = n);
    }
    yf.prototype = {
      constructor: yf,
      scale: function (t) {
        return 1 === t ? this : new yf(this.k * t, this.x, this.y);
      },
      translate: function (t, e) {
        return (0 === t) & (0 === e)
          ? this
          : new yf(this.k, this.x + this.k * t, this.y + this.k * e);
      },
      apply: function (t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y];
      },
      applyX: function (t) {
        return t * this.k + this.x;
      },
      applyY: function (t) {
        return t * this.k + this.y;
      },
      invert: function (t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
      },
      invertX: function (t) {
        return (t - this.x) / this.k;
      },
      invertY: function (t) {
        return (t - this.y) / this.k;
      },
      rescaleX: function (t) {
        return t
          .copy()
          .domain(t.range().map(this.invertX, this).map(t.invert, t));
      },
      rescaleY: function (t) {
        return t
          .copy()
          .domain(t.range().map(this.invertY, this).map(t.invert, t));
      },
      toString: function () {
        return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
      },
    };
    new yf(1, 0, 0);
    yf.prototype;
    function vf(t, e, n, r, i) {
      const a = t.length;
      let o = 0,
        l = 0;
      for (let u = 0; u < a; u++) {
        const s = t[u],
          c = e(s),
          f = n(s),
          h = i(c);
        (o += Math.pow(f - h, 2)), (l += Math.pow(f - r / a, 2));
      }
      return 1 - o / l;
    }
    function gf(t) {
      return (180 * Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])) / Math.PI;
    }
    function _f(t, e, n) {
      const r = 0.01;
      let i = [o(t), o(e)],
        a = 0;
      for (; l(i) && a < 1e4; );
      return i;
      function o(t) {
        return [t, n(t)];
      }
      function l(t) {
        a++;
        const e = t.length;
        let n = !1;
        for (let a = 0; a < e - 1; a++) {
          const e = t[a],
            l = t[a + 1],
            u = [((i = [e, l])[0][0] + i[1][0]) / 2, (i[0][1] + i[1][1]) / 2],
            s = o(u[0]),
            c = gf([e, u]),
            f = gf([e, s]);
          Math.abs(c - f) > r && (t.splice(a + 1, 0, s), (n = !0));
        }
        var i;
        return n;
      }
    }
    var bf = function () {
      let t,
        e = (t) => t[0],
        n = (t) => t[1];
      function r(r) {
        let i = r.length,
          a = 0,
          o = 0,
          l = 0,
          u = 0,
          s = 0,
          c = t ? +t[0] : 1 / 0,
          f = t ? +t[1] : -1 / 0;
        for (let h = 0; h < i; h++) {
          const i = r[h],
            p = e(i, h, r),
            d = n(i, h, r);
          null != p &&
            isFinite(p) &&
            null != d &&
            isFinite(d) &&
            (a++,
            (o += p),
            (l += d),
            (u += p * d),
            (s += p * p),
            t || (p < c && (c = p), p > f && (f = p)));
        }
        const h = ((i = a) * u - o * l) / (i * s - o * o),
          p = (l - h * o) / i,
          d = (t) => h * t + p,
          m = vf(r, e, n, l, d),
          y = [
            [c, c * h + p],
            [f, f * h + p],
          ];
        return (y.a = h), (y.b = p), (y.predict = d), (y.rSquared = m), y;
      }
      return (
        (r.domain = function (e) {
          return arguments.length ? ((t = e), r) : t;
        }),
        (r.x = function (t) {
          return arguments.length ? ((e = t), r) : e;
        }),
        (r.y = function (t) {
          return arguments.length ? ((n = t), r) : n;
        }),
        r
      );
    };
    var wf = function () {
      let t,
        e = (t) => t[0],
        n = (t) => t[1];
      function r(r) {
        let i = r.length,
          a = 0,
          o = 0,
          l = 0,
          u = 0,
          s = 0,
          c = 0,
          f = t ? +t[0] : 1 / 0,
          h = t ? +t[1] : -1 / 0;
        for (let p = 0; p < i; p++) {
          const i = r[p],
            d = e(i, p, r),
            m = n(i, p, r);
          null != d &&
            isFinite(d) &&
            null != m &&
            isFinite(m) &&
            (a++,
            (o += Math.log(d)),
            (l += Math.log(m) * Math.log(d)),
            (u += Math.log(m)),
            (s += Math.pow(Math.log(d), 2)),
            (c += m),
            t || (d < f && (f = d), d > h && (h = d)));
        }
        const p = ((i = a) * l - o * u) / (i * s - Math.pow(o, 2)),
          d = Math.exp((u - p * o) / i),
          m = (t) => d * Math.pow(t, p),
          y = _f(f, h, m);
        return (
          (y.a = d),
          (y.b = p),
          (y.predict = m),
          (y.rSquared = vf(r, e, n, c, m)),
          y
        );
      }
      return (
        (r.domain = function (e) {
          return arguments.length ? ((t = e), r) : t;
        }),
        (r.x = function (t) {
          return arguments.length ? ((e = t), r) : e;
        }),
        (r.y = function (t) {
          return arguments.length ? ((n = t), r) : n;
        }),
        r
      );
    };
    var xf = function (t) {
      return t;
    };
    function kf(t, ...e) {
      return Ef(t, xf, xf, e);
    }
    function Ef(t, e, n, r) {
      return (function t(i, a) {
        if (a >= r.length) return n(i);
        const o = new Map(),
          l = r[a++];
        let u = -1;
        for (const t of i) {
          const e = l(t, ++u, i),
            n = o.get(e);
          n ? n.push(t) : o.set(e, [t]);
        }
        for (const [e, n] of o) o.set(e, t(n, a));
        return e(o);
      })(t, 0);
    }
    var Tf = function (t, e) {
        switch (t) {
          case If.LINEAR:
            return 'y = '
              .concat(e.a.toFixed(2), ' x + ')
              .concat(e.b.toFixed(2));
          case If.POWER_LAW:
          default:
            return 'y = '
              .concat(e.a.toFixed(2), ' x ^ ')
              .concat(e.b.toFixed(2));
        }
      },
      Sf = function (t, e, n) {
        return (function () {
          var t = ol,
            e = !1,
            n = 1,
            r = 1,
            i = [0],
            a = Zo,
            o = Zo,
            l = Zo,
            u = Zo,
            s = Zo;
          function c(t) {
            return (
              (t.x0 = t.y0 = 0),
              (t.x1 = n),
              (t.y1 = r),
              t.eachBefore(f),
              (i = [0]),
              e && t.eachBefore(tl),
              t
            );
          }
          function f(e) {
            var n = i[e.depth],
              r = e.x0 + n,
              c = e.y0 + n,
              f = e.x1 - n,
              h = e.y1 - n;
            f < r && (r = f = (r + f) / 2),
              h < c && (c = h = (c + h) / 2),
              (e.x0 = r),
              (e.y0 = c),
              (e.x1 = f),
              (e.y1 = h),
              e.children &&
                ((n = i[e.depth + 1] = a(e) / 2),
                (r += s(e) - n),
                (c += o(e) - n),
                (f -= l(e) - n) < r && (r = f = (r + f) / 2),
                (h -= u(e) - n) < c && (c = h = (c + h) / 2),
                t(e, r, c, f, h));
          }
          return (
            (c.round = function (t) {
              return arguments.length ? ((e = !!t), c) : e;
            }),
            (c.size = function (t) {
              return arguments.length ? ((n = +t[0]), (r = +t[1]), c) : [n, r];
            }),
            (c.tile = function (e) {
              return arguments.length ? ((t = Go(e)), c) : t;
            }),
            (c.padding = function (t) {
              return arguments.length
                ? c.paddingInner(t).paddingOuter(t)
                : c.paddingInner();
            }),
            (c.paddingInner = function (t) {
              return arguments.length
                ? ((a = 'function' == typeof t ? t : Jo(+t)), c)
                : a;
            }),
            (c.paddingOuter = function (t) {
              return arguments.length
                ? c
                    .paddingTop(t)
                    .paddingRight(t)
                    .paddingBottom(t)
                    .paddingLeft(t)
                : c.paddingTop();
            }),
            (c.paddingTop = function (t) {
              return arguments.length
                ? ((o = 'function' == typeof t ? t : Jo(+t)), c)
                : o;
            }),
            (c.paddingRight = function (t) {
              return arguments.length
                ? ((l = 'function' == typeof t ? t : Jo(+t)), c)
                : l;
            }),
            (c.paddingBottom = function (t) {
              return arguments.length
                ? ((u = 'function' == typeof t ? t : Jo(+t)), c)
                : u;
            }),
            (c.paddingLeft = function (t) {
              return arguments.length
                ? ((s = 'function' == typeof t ? t : Jo(+t)), c)
                : s;
            }),
            c
          );
        })()
          .tile(ol)
          .size([e, n])
          .padding(1)
          .round(!0)(
          qo(t)
            .sum(function (t) {
              return t.value;
            })
            .sort(function (t, e) {
              return e.value - t.value;
            })
        );
      },
      Cf = Ta(',d'),
      Mf = function (t) {
        t.append('text')
          .selectAll('tspan')
          .data(function (t) {
            return t.data.name.concat(Cf(t.value));
          })
          .join('tspan')
          .attr('x', 3)
          .attr('y', function (t, e, n) {
            return ''.concat(0.3 * (e === n.length - 1) + 1.1 + 0.9 * e, 'em');
          })
          .attr('fill-opacity', function (t, e, n) {
            return e === n.length - 1 ? 0.7 : null;
          })
          .text(function (t) {
            return t;
          });
      },
      Nf = function (t) {
        var e = t.fileClickCallback,
          n = t.values,
          a = t.filePrefix,
          o = t.displayRegression,
          l = t.regressionType,
          u = t.displayFilenames,
          s = t.path,
          c = t.activeFile,
          f = Object(r.useRef)(null);
        return (
          Object(r.useEffect)(function () {
            !(function (t, e) {
              var n = e.values,
                r = e.displayRegression,
                i = void 0 === r || r,
                a = e.regressionType,
                o = void 0 === a ? 0 : a,
                l = (e.metricType, e.displayFilenames),
                u = void 0 !== l && l,
                s = e.filePrefix,
                c = void 0 === s ? '' : s,
                f = e.path,
                h = void 0 === f ? '' : f,
                p =
                  (e.activeFile,
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : function () {});
              t.innerHTML = '';
              var d = 600,
                m = 600;
              n = n.filter(function (t) {
                return t.file_path.startsWith(''.concat(c).concat(h));
              });
              var y = { top: 20, right: 30, bottom: 30, left: 40 },
                v = Kl()
                  .domain(
                    W(
                      n.filter(function (t) {
                        return t.y > 0;
                      }),
                      function (t) {
                        return t.x * t.y;
                      }
                    )
                  )
                  .range(['green', 'red']),
                g = Kl()
                  .domain(
                    W(
                      n.filter(function (t) {
                        return t.y > 0;
                      }),
                      function (t) {
                        return t.x * t.y;
                      }
                    )
                  )
                  .range(['lightgreen', 'tomato']),
                _ = Hl()
                  .domain(
                    W(n, function (t) {
                      return t.x;
                    })
                  )
                  .nice()
                  .range([y.left, d - y.right]),
                b = Hl()
                  .domain(
                    W(n, function (t) {
                      return t.y;
                    })
                  )
                  .nice()
                  .range([m - y.bottom, y.top]),
                w = function (t) {
                  return t
                    .attr('transform', 'translate(0,'.concat(m - y.bottom, ')'))
                    .call(pt(_))
                    .call(function (t) {
                      return t.select('.domain').remove();
                    })
                    .call(function (t) {
                      return t
                        .append('text')
                        .attr('x', d / 2 + y.left)
                        .attr('y', 30)
                        .attr('fill', '#000')
                        .attr('font-size', 12)
                        .attr('font-weight', 'bold')
                        .attr('text-anchor', 'end')
                        .text('Churn');
                    });
                },
                x = function (t) {
                  return t
                    .attr('transform', 'translate('.concat(y.left, ',0)'))
                    .call(dt(b))
                    .call(function (t) {
                      return t.select('.domain').remove();
                    })
                    .call(function (t) {
                      return t
                        .append('text')
                        .attr('y', -30)
                        .attr('x', -m / 2)
                        .attr('transform', 'rotate(-90)')
                        .attr('fill', '#000')
                        .attr('font-size', 12)
                        .attr('text-anchor', 'start')
                        .attr('font-weight', 'bold')
                        .text('Complexity');
                    });
                },
                k = ac()
                  .x(function (t) {
                    return _(t[0]);
                  })
                  .y(function (t) {
                    return b(t[1]);
                  }),
                E = Le(t).append('svg').attr('viewBox', [0, 0, d, m]),
                T = E.append('g');
              if (
                (T.append('g')
                  .attr('class', 'axis')
                  .call(w)
                  .selectAll('.tick line')
                  .classed('baseline', function (t) {
                    return 0 === t;
                  }),
                T.append('g')
                  .attr('class', 'axis')
                  .call(x)
                  .selectAll('.tick line')
                  .classed('baseline', function (t) {
                    return 0 === t;
                  }),
                T.append('g')
                  .attr('stroke-width', 1.5)
                  .attr('font-family', 'Red Hat Text')
                  .attr('font-size', 12)
                  .selectAll('g')
                  .data(n)
                  .join('g')
                  .attr('transform', function (t) {
                    return 'translate('.concat(_(t.x), ',').concat(b(t.y), ')');
                  })
                  .call(function (t) {
                    return t
                      .append('circle')
                      .attr('fill', function (t) {
                        return g(t.x * t.y);
                      })
                      .attr('stroke', function (t) {
                        return v(t.x * t.y);
                      })
                      .attr('style', 'cursor:pointer')
                      .attr('r', 4);
                  })
                  .call(function (t) {
                    return u
                      ? t
                          .append('text')
                          .attr('dy', '0.35em')
                          .attr('x', 7)
                          .attr('style', 'cursor:pointer')
                          .text(function (t) {
                            return t.file_path;
                          })
                      : null;
                  })
                  .on('click', function (t) {
                    p(t);
                  }),
                i)
              ) {
                var S = (function (t) {
                    switch (t) {
                      case If.LINEAR:
                        return bf()
                          .x(function (t) {
                            return t.x;
                          })
                          .y(function (t) {
                            return t.y;
                          })
                          .domain([
                            3,
                            J(n, function (t) {
                              return t.x;
                            }),
                          ]);
                      case If.POWER_LAW:
                      default:
                        return (
                          (n = n.filter(function (t) {
                            return t.y > 0;
                          })),
                          wf()
                            .x(function (t) {
                              return t.x;
                            })
                            .y(function (t) {
                              return t.y;
                            })
                            .domain([
                              3,
                              J(n, function (t) {
                                return t.x;
                              }),
                            ])
                        );
                    }
                  })(o),
                  C = S(n);
                T.append('g')
                  .attr('font-family', 'Red Hat Text')
                  .attr('font-size', 24)
                  .call(function (t) {
                    return t
                      .append('path')
                      .attr('class', 'regression')
                      .datum(S(n))
                      .attr('d', k);
                  })
                  .call(function (t) {
                    return t
                      .append('text')
                      .attr('dy', '60')
                      .attr('dx', '33%')
                      .text('R^2 = '.concat(C.rSquared.toFixed(2)));
                  })
                  .call(function (t) {
                    return t
                      .append('text')
                      .attr('dy', '30')
                      .attr('dx', '33%')
                      .text(Tf(o, C));
                  });
              }
            })(
              f.current,
              {
                values: n,
                displayRegression: o,
                regressionType: l,
                displayFilenames: u,
                filePrefix: a,
                path: s,
                activeFile: c,
              },
              e
            );
          }),
          i.a.createElement('div', { id: 'canvas', ref: f })
        );
      },
      Pf = function (t) {
        var e = t.fileClickCallback,
          n = t.values,
          a = t.filePrefix,
          o = t.displayRegression,
          l = t.regressionType,
          s = t.metricType,
          c = t.displayFilenames,
          f = t.path,
          h = t.activeFile,
          p = Object(r.useRef)(null);
        return (
          Object(r.useEffect)(function () {
            !(function (t, e) {
              var n = e.values,
                r = (e.displayRegression, e.regressionType, e.metricType),
                i = void 0 === r ? 0 : r,
                a = e.displayFilenames,
                o = void 0 !== a && a,
                l = e.filePrefix,
                s = void 0 === l ? '' : l,
                c = e.path,
                f = void 0 === c ? '' : c,
                h =
                  (e.activeFile,
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : function () {});
              t.innerHTML = '';
              var p = 600,
                d = 600,
                m = Cl(Ks),
                y = (n = n.filter(function (t) {
                  return t.file_path.startsWith(''.concat(s).concat(f));
                }))
                  .map(function (t) {
                    var e;
                    switch (i) {
                      case Uf.COMPLEXITY:
                        e = t.y;
                        break;
                      case Uf.CHURN:
                        e = t.x;
                        break;
                      case Uf.CHURN_COMPLEXITY:
                      default:
                        e = t.y * t.x;
                    }
                    return {
                      name: t.file_path.substring(s.length + 1),
                      value: e,
                      file_path: t.file_path,
                      details: t.details,
                      history: t.history,
                    };
                  })
                  .map(function (t) {
                    return {
                      name: t.name.split('/'),
                      value: t.value,
                      file_path: t.file_path,
                      details: t.details,
                      history: t.history,
                    };
                  }),
                v = {
                  name: s,
                  children: Array.from(
                    kf(y, function (t) {
                      return t.name[0];
                    }),
                    function (t) {
                      var e = u()(t, 2),
                        n = e[0],
                        r = e[1];
                      return {
                        name: n,
                        children: Array.from(
                          kf(r, function (t) {
                            return t.name[1];
                          }),
                          function (t) {
                            var e = u()(t, 2);
                            return { name: e[0], children: e[1] };
                          }
                        ),
                      };
                    }
                  ),
                },
                g = Le(t)
                  .append('svg')
                  .attr('viewBox', [0, 0, p, d])
                  .style('font-size', '10px');
              if (v.children.length > 0) {
                var _ = Sf(v, p, d),
                  b = g
                    .selectAll('g')
                    .data(_.leaves())
                    .join('g')
                    .attr('transform', function (t) {
                      return 'translate('.concat(t.x0, ',').concat(t.y0, ')');
                    });
                b.append('title').text(function (t) {
                  return ''
                    .concat(
                      t
                        .ancestors()
                        .reverse()
                        .map(function (t) {
                          return t.data.name;
                        })
                        .join('/'),
                      '\n'
                    )
                    .concat(Cf(t.value));
                }),
                  b
                    .append('rect')
                    .attr('fill', function (t) {
                      for (; t.depth > 1; ) t = t.parent;
                      return m(t.data.name);
                    })
                    .attr('fill-opacity', 0.6)
                    .attr('width', function (t) {
                      return t.x1 - t.x0;
                    })
                    .attr('height', function (t) {
                      return t.y1 - t.y0;
                    })
                    .on('click', function (t) {
                      h(t.data);
                    }),
                  o && Mf(b);
              }
            })(
              p.current,
              {
                values: n,
                displayRegression: o,
                regressionType: l,
                metricType: s,
                displayFilenames: c,
                filePrefix: a,
                path: f,
                activeFile: h,
              },
              e
            );
          }),
          i.a.createElement('div', { id: 'canvas', ref: p })
        );
      },
      Of = function (t) {
        var e = t.fileClickCallback,
          n = t.values,
          a = t.filePrefix,
          o = t.displayRegression,
          l = t.regressionType,
          u = t.metricType,
          s = t.displayFilenames,
          c = t.path,
          f = t.activeFile,
          h = Object(r.useRef)(null);
        return (
          Object(r.useEffect)(function () {
            !(function (t, e) {
              var n = e.values,
                r = (e.displayRegression, e.regressionType, e.metricType),
                i = void 0 === r ? 0 : r,
                a = (e.displayFilenames, e.filePrefix),
                o = void 0 === a ? '' : a,
                l = e.path,
                u = void 0 === l ? '' : l;
              e.activeFile,
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              t.innerHTML = '';
              var s = 600,
                c = 600;
              n = n.filter(function (t) {
                return t.file_path.startsWith(''.concat(o).concat(u));
              });
              var f = { top: 20, right: 30, bottom: 30, left: 40 },
                h = Le(t)
                  .append('svg')
                  .attr('viewBox', [0, 0, s, c])
                  .style('font-size', '10px'),
                p = n.map(function (t) {
                  return i === Uf.COMPLEXITY ? t.y : t.x;
                }),
                d = Hl().domain(W(p)).range(['green', 'red']),
                m = Hl()
                  .domain(W(p))
                  .nice(20)
                  .range([f.left, s - f.right]),
                y = Z().domain(m.domain()).thresholds(m.ticks(20))(p),
                v = Hl()
                  .domain([
                    0,
                    J(y, function (t) {
                      return t.length;
                    }),
                  ])
                  .nice()
                  .range([c - f.bottom, f.top]),
                g = function (t) {
                  return t
                    .attr('transform', 'translate(0,'.concat(c - f.bottom, ')'))
                    .call(pt(m).tickSizeOuter(0));
                },
                _ = function (t) {
                  return t
                    .attr('transform', 'translate('.concat(f.left, ',0)'))
                    .call(dt(v));
                };
              h
                .append('g')
                .selectAll('rect')
                .data(y)
                .join('rect')
                .attr('fill', function (t) {
                  return d(t.x0);
                })
                .attr('x', function (t) {
                  return m(t.x0) + 1;
                })
                .attr('width', function (t) {
                  return Math.max(0, m(t.x1) - m(t.x0) - 1);
                })
                .attr('y', function (t) {
                  return v(t.length);
                })
                .attr('height', function (t) {
                  return v(0) - v(t.length);
                }),
                h.append('g').call(g),
                h.append('g').call(_);
            })(
              h.current,
              {
                values: n,
                displayRegression: o,
                regressionType: l,
                metricType: u,
                displayFilenames: s,
                filePrefix: a,
                path: c,
                activeFile: f,
              },
              e
            );
          }),
          i.a.createElement('div', { id: 'canvas', ref: h })
        );
      },
      Af = n(41),
      Lf = n.n(Af);
    function Rf(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Ff(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Rf(n, !0).forEach(function (e) {
              Lf()(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Rf(n).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var zf = function (t, e) {
        var n = t;
        switch (e.type) {
          case 'SET_DISPLAY_REGRESSION':
            n = Ff({}, t, { displayRegression: e.displayRegression });
            break;
          case 'SET_DISPLAY_FILENAMES':
            n = Ff({}, t, { displayFilenames: e.displayFilenames });
            break;
          case 'SET_REGRESSION_TYPE':
            n = Ff({}, t, { regressionType: e.regressionType });
            break;
          case 'SET_METRIC_TYPE':
            n = Ff({}, t, { metricType: e.metricType });
            break;
          case 'SET_VALUES':
            n = Ff({}, t, { values: e.values });
            break;
          case 'SET_FILE_PREFIX':
            n = Ff({}, t, { filePrefix: e.filePrefix });
            break;
          case 'SET_PATH':
            n = Ff({}, t, { path: e.path });
            break;
          case 'SET_ACTIVE_FILE':
            n = Ff({}, t, { activeFile: e.activeFile });
        }
        return n;
      },
      If = { POWER_LAW: 0, LINEAR: 1 },
      jf = { SCATTER_PLOT: 0, TREE_MAP: 1 },
      Uf = { CHURN_COMPLEXITY: 0, COMPLEXITY: 1, CHURN: 2 },
      Df = {
        displayRegression: !1,
        displayFilenames: !1,
        regressionType: If.POWER_LAW,
        metricType: Uf.CHURN_COMPLEXITY,
        values: [],
        filePrefix: '',
        path: '',
        activeFile: {},
      },
      Hf = function (t) {
        var e = t.type,
          n = t.finishedLoadingCallback,
          a = (t.errorCallback, Object(r.useReducer)(zf, Df)),
          o = u()(a, 2),
          l = o[0],
          s = o[1],
          f = Object(r.useState)(0),
          p = u()(f, 2),
          d = p[0],
          m = p[1],
          y = Object(r.useState)(!1),
          v = u()(y, 2),
          g = v[0],
          _ = v[1],
          b = (function () {
            var t = h()(
              c.a.mark(function t() {
                var n;
                return c.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (!window.values) {
                          t.next = 4;
                          break;
                        }
                        (n = new Promise(function (t, e) {
                          return t(window.values);
                        })),
                          (t.next = 9);
                        break;
                      case 4:
                        return (t.next = 6), fetch('values?type='.concat(e));
                      case 6:
                        return (t.next = 8), t.sent.json();
                      case 8:
                        n = t.sent;
                      case 9:
                        return t.abrupt('return', n);
                      case 10:
                      case 'end':
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          w = (function () {
            var t = h()(
              c.a.mark(function t() {
                var e;
                return c.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (!window.filePrefix) {
                          t.next = 4;
                          break;
                        }
                        (e = new Promise(function (t, e) {
                          return t(window.filePrefix);
                        })),
                          (t.next = 9);
                        break;
                      case 4:
                        return (t.next = 6), fetch('file_prefix');
                      case 6:
                        return (t.next = 8), t.sent.json();
                      case 8:
                        e = t.sent;
                      case 9:
                        return t.abrupt('return', e);
                      case 10:
                      case 'end':
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })();
        function x(t) {
          s({ type: 'SET_ACTIVE_FILE', activeFile: t });
        }
        Object(r.useEffect)(
          function () {
            h()(
              c.a.mark(function t() {
                var e, r, i, a;
                return c.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), Promise.all([b(), w()]);
                      case 2:
                        (e = t.sent),
                          (r = u()(e, 2)),
                          (i = r[0]),
                          (a = r[1]),
                          void 0 === i.error
                            ? (_(!1),
                              s({ type: 'SET_VALUES', values: i }),
                              a.file_prefix &&
                                s({
                                  type: 'SET_FILE_PREFIX',
                                  filePrefix: a.file_prefix,
                                }))
                            : _(!0),
                          n();
                      case 8:
                      case 'end':
                        return t.stop();
                    }
                }, t);
              })
            )();
          },
          [e]
        );
        return i.a.createElement(
          'div',
          { className: 'row pt-4' },
          i.a.createElement(
            'div',
            {
              className:
                l.activeFile && 0 !== Object.keys(l.activeFile).length
                  ? 'col-8'
                  : 'col-12',
            },
            i.a.createElement(
              'div',
              { className: 'card' },
              i.a.createElement(
                'div',
                { className: 'card-header' },
                i.a.createElement(
                  'h5',
                  { className: 'card-title' },
                  'Churn vs Complexity'
                ),
                i.a.createElement(
                  'h6',
                  { className: 'text-muted' },
                  'Click on a point for additional information'
                )
              ),
              i.a.createElement(
                'div',
                { className: 'card-body' },
                i.a.createElement(
                  'div',
                  { className: 'row' },
                  i.a.createElement(
                    'div',
                    { className: 'col-12 col-lg-4' },
                    i.a.createElement(
                      'div',
                      { id: 'path-input-group' },
                      i.a.createElement(
                        'label',
                        { htmlFor: 'path', className: 'text-muted' },
                        i.a.createElement('small', null, 'Base Path')
                      ),
                      i.a.createElement(
                        'div',
                        { className: 'input-group mb-3' },
                        i.a.createElement(
                          'div',
                          { className: 'input-group-prepend' },
                          i.a.createElement(
                            'span',
                            { className: 'input-group-text', id: 'path-text' },
                            './'.concat(l.filePrefix || '')
                          )
                        ),
                        i.a.createElement('input', {
                          type: 'text',
                          className: 'form-control',
                          placeholder: '',
                          'aria-label': '',
                          'aria-describedby': 'path-text',
                          id: 'path',
                          value: l.path,
                          onChange: function (t) {
                            t.preventDefault(),
                              s({ type: 'SET_PATH', path: t.target.value });
                          },
                        })
                      )
                    )
                  ),
                  i.a.createElement(
                    'div',
                    { className: 'col-6 col-lg-4' },
                    i.a.createElement(
                      'label',
                      { htmlFor: 'path', className: 'text-muted d-block' },
                      i.a.createElement('small', null, 'Plot Type')
                    ),
                    i.a.createElement(
                      'div',
                      {
                        className: 'btn-group btn-group-toggle',
                        role: 'toolbar',
                        'aria-label': 'Plot Type',
                      },
                      i.a.createElement(
                        'button',
                        {
                          className: 'btn btn-secondary '.concat(
                            d === jf.SCATTER_PLOT && 'active'
                          ),
                          onClick: function (t) {
                            t.preventDefault(), m(jf.SCATTER_PLOT);
                          },
                        },
                        'Scatterplot/Hist'
                      ),
                      i.a.createElement(
                        'button',
                        {
                          className: 'btn btn-secondary '.concat(
                            d === jf.TREE_MAP && 'active'
                          ),
                          onClick: function (t) {
                            t.preventDefault(), m(jf.TREE_MAP);
                          },
                        },
                        'Treemap'
                      )
                    )
                  ),
                  i.a.createElement(
                    'div',
                    { className: 'col-6 col-lg-4' },
                    i.a.createElement(
                      'div',
                      { className: 'form-group' },
                      i.a.createElement(
                        'label',
                        { htmlFor: 'metric-type', className: 'text-muted' },
                        i.a.createElement('small', null, 'Metric')
                      ),
                      i.a.createElement(
                        'select',
                        {
                          id: 'metric-type',
                          className: 'form-control',
                          onChange: function (t) {
                            t.preventDefault(),
                              s({
                                type: 'SET_METRIC_TYPE',
                                metricType: parseInt(t.target.value),
                              });
                          },
                        },
                        i.a.createElement(
                          'option',
                          { selected: !0, value: '0' },
                          'Churn * Complexity'
                        ),
                        i.a.createElement(
                          'option',
                          { value: '1' },
                          'Complexity'
                        ),
                        i.a.createElement('option', { value: '2' }, 'Churn')
                      )
                    )
                  )
                ),
                i.a.createElement(
                  'div',
                  {
                    className: 'd-flex '.concat(
                      g
                        ? 'justify-content-center align-items-center'
                        : 'justify-content-start'
                    ),
                    id: 'canvas-wrapper',
                  },
                  g
                    ? i.a.createElement(
                        'div',
                        { className: 'text-center error' },
                        i.a.createElement(T, { icon: M, size: '6x' }),
                        i.a.createElement('h3', null, 'Oh snap!'),
                        'There has been an error loading the churn count.'
                      )
                    : i.a.createElement(
                        i.a.Fragment,
                        null,
                        d === jf.SCATTER_PLOT
                          ? l.metricType === Uf.CHURN_COMPLEXITY
                            ? i.a.createElement(
                                Nf,
                                R()({ fileClickCallback: x }, l)
                              )
                            : i.a.createElement(
                                Of,
                                R()({ fileClickCallback: x }, l)
                              )
                          : i.a.createElement(
                              Pf,
                              R()({ fileClickCallback: x }, l)
                            )
                      )
                ),
                i.a.createElement(z, { state: l, dispatch: s, activePlot: d })
              )
            )
          ),
          l.activeFile &&
            Object.keys(l.activeFile).length > 0 &&
            i.a.createElement(F, {
              activeFile: l.activeFile,
              handleClose: function () {
                s({ type: 'SET_ACTIVE_FILE', activeFile: {} });
              },
            })
        );
      },
      Wf = n(42),
      $f = n.n(Wf);
    var Yf = function () {
      return (Yf =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var i in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t;
        }).apply(this, arguments);
    };
    var Bf,
      qf = function () {
        var t = Object(r.useState)(0)[1];
        return Object(r.useCallback)(function () {
          return t(function (t) {
            return t + 1;
          });
        }, []);
      },
      Vf = function (t) {
        void 0 === t && (t = {});
        var e = qf(),
          n = Object(r.useRef)(Yf({}, t));
        return [
          Object(r.useCallback)(function () {
            return n.current;
          }, []),
          Object(r.useCallback)(function (t) {
            t && (Object.assign(n.current, t), e());
          }, []),
        ];
      },
      Xf = function (t) {
        Object(r.useEffect)(t, []);
      },
      Qf = function (t, e) {
        var n = Object(r.useRef)(!0);
        Object(r.useEffect)(function () {
          if (!n.current) return t();
          n.current = !1;
        }, e);
      },
      Kf =
        (n(43),
        function (t, e, n) {
          return (t = (t = t <= n ? t : n) >= e ? t : e);
        }),
      Gf = !1,
      Zf = [],
      Jf = function (t) {
        Zf.push(t),
          Gf ||
            1 !== Zf.length ||
            (function t() {
              Gf = !0;
              var e = Zf.shift();
              if (e) return e(t);
              Gf = !1;
            })();
      },
      th = function (t, e) {
        var n;
        Bf = window.requestAnimationFrame(function r(i) {
          i - (n = n || i) > e ? t() : (Bf = window.requestAnimationFrame(r));
        });
      },
      eh = function () {},
      nh = { isFinished: !1, progress: 0, sideEffect: eh },
      rh = function () {
        Bf && window.cancelAnimationFrame(Bf), (Gf = !1), (Zf = []);
      },
      ih = function (t) {
        var e = void 0 === t ? {} : t,
          n = e.animationDuration,
          i = void 0 === n ? 200 : n,
          a = e.incrementDuration,
          o = void 0 === a ? 800 : a,
          l = e.isAnimating,
          u = void 0 !== l && l,
          s = e.minimum,
          c = void 0 === s ? 0.08 : s,
          f = Vf(nh),
          h = f[0],
          p = f[1],
          d = function (t) {
            if (1 === (t = Kf(t, c, 1)))
              return (
                rh(),
                Jf(function (e) {
                  p({
                    progress: t,
                    sideEffect: function () {
                      return th(e, i);
                    },
                  });
                }),
                void Jf(function () {
                  p({ isFinished: !0, sideEffect: rh });
                })
              );
            Jf(function (e) {
              p({
                progress: t,
                sideEffect: function () {
                  return th(e, i);
                },
              });
            });
          },
          m = function () {
            var t, e;
            d(
              ((t = h().progress),
              (e = 0),
              t >= 0 && t < 0.2
                ? (e = 0.1)
                : t >= 0.2 && t < 0.5
                ? (e = 0.04)
                : t >= 0.5 && t < 0.8
                ? (e = 0.02)
                : t >= 0.8 && t < 0.99 && (e = 0.005),
              Kf(t + e, 0, 0.994))
            );
          },
          y = function () {
            !(function t() {
              m(),
                Jf(function (e) {
                  th(function () {
                    t(), e();
                  }, o);
                });
            })();
          },
          v = Object(r.useRef)(eh);
        return (
          Object(r.useEffect)(function () {
            v.current = m;
          }),
          Xf(function () {
            return u && y(), rh;
          }),
          Qf(
            function () {
              h().sideEffect();
            },
            [h().sideEffect]
          ),
          Qf(
            function () {
              u ? p({ sideEffect: y }) : d(1);
            },
            [u]
          ),
          {
            animationDuration: i,
            isFinished: h().isFinished,
            progress: h().progress,
          }
        );
      },
      ah = function (t) {
        var e = t.children,
          n = $f()(t, ['children']);
        return e(ih(n));
      };
    var oh = function (t) {
      var e = t.progress,
        n = t.animationDuration;
      return r.createElement(
        'div',
        {
          className: 'progressbar',
          style: {
            marginLeft: ''.concat(100 * (-1 + e), '%'),
            transition: 'margin-left '.concat(n, 'ms linear'),
          },
        },
        r.createElement('div', { className: 'shadow' })
      );
    };
    oh.propTypes = {
      animationDuration: m.a.number.isRequired,
      progress: m.a.number.isRequired,
    };
    var lh = oh,
      uh = function (t) {
        var e = t.children,
          n = t.isFinished,
          i = t.animationDuration;
        return r.createElement(
          'div',
          {
            style: {
              opacity: n ? 0 : 1,
              pointerEvents: 'none',
              transition: 'opacity '.concat(i, 'ms linear'),
            },
          },
          e
        );
      };
    uh.propTypes = {
      animationDuration: m.a.number.isRequired,
      children: m.a.node.isRequired,
      isFinished: m.a.bool.isRequired,
    };
    var sh = uh,
      ch = function (t) {
        var e = t.isAnimating,
          n = t.key;
        return i.a.createElement(ah, { isAnimating: e, key: n }, function (t) {
          var e = t.animationDuration,
            n = t.isFinished,
            r = t.progress;
          return i.a.createElement(
            sh,
            { isFinished: n, animationDuration: e },
            i.a.createElement(lh, { progress: r, animationDuration: e })
          );
        });
      };
    function fh() {
      var t = Object(r.useState)(window.type || 'rb'),
        e = u()(t, 2),
        n = e[0],
        a = e[1],
        o = Object(r.useState)(!0),
        l = u()(o, 2),
        s = l[0],
        c = l[1];
      return i.a.createElement(
        i.a.Fragment,
        null,
        i.a.createElement(ch, { isAnimating: s, key: n }),
        i.a.createElement(
          'nav',
          {
            className:
              'navbar navbar-expand-lg navbar-light bg-light fixed-top',
          },
          i.a.createElement(
            'a',
            { className: 'navbar-brand', href: '#' },
            i.a.createElement('img', {
              src: 'images/attractor_logo.svg',
              alt: '',
              width: '36',
              className: 'mr-3',
            }),
            'Attractor'
          ),
          i.a.createElement(
            'ul',
            { className: 'navbar-nav mx-auto' },
            Object.entries(window.types).map(function (t) {
              var e = u()(t, 2),
                r = e[0],
                o = e[1];
              return i.a.createElement(
                'li',
                { className: 'nav-item '.concat(n === r ? 'active' : '') },
                i.a.createElement(
                  'a',
                  {
                    className: 'nav-link',
                    href: window.serveStatic
                      ? 'index.'.concat(r, '.html')
                      : '#',
                    onClick: function () {
                      window.serveStatic || (c(!0), a(r));
                    },
                  },
                  o
                )
              );
            })
          )
        ),
        i.a.createElement(
          'div',
          { className: 'container' },
          i.a.createElement(Hf, {
            type: n,
            finishedLoadingCallback: function () {
              c(!1);
            },
          }),
          i.a.createElement(
            'div',
            { className: 'row mt-3' },
            i.a.createElement(
              'div',
              { className: 'col-12' },
              i.a.createElement(A, { type: n })
            )
          )
        )
      );
    }
    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('react-root') &&
        o.a.render(
          i.a.createElement(fh, null),
          document.getElementById('react-root')
        );
    });
  },
]);
