/**
 * image.js v1 | https://github.com/xaoxuu/hexo-theme-stellar/
 * 格式与官方标签插件一致使用空格分隔，中括号内的是可选参数（中括号不需要写出来）
 * 
 * {% image src [alt] [width:400px] [bg:#eee] [download:true/false/url] %}
 */

'use strict';

const { ArgsMap } = require('./utils');

hexo.extend.tag.register('image', function(args) {
  args = ArgsMap(args, ['width', 'height', 'bg', 'download', 'padding'], ['src', 'alt']);
  var style = '';
  if (args.width) {
    style += 'width:' + args.width + ';';
  }
  if (args.height) {
    style += 'height:' + args.height + ';';
  }
  if (args.padding) {
    style += 'padding:' + args.padding + ';';
  }
  function img(src, alt, style) {
    let img = '';
    img += '<img class="img" src="' + src + '"';
    if (alt) {
      img += ' alt="' + alt + '"';
    }
    if (style.length > 0) {
      img += ' style="' + style + '"';
    }
    img += '/>';
    return img;
  }

  var el = '';
  // wrap
  el += '<div class="tag-plugin img-wrap">';
  // bg
  el += '<div class="img-bg"';
  if (args.bg && args.bg.length > 0) {
    el += ' style="background:' + args.bg + '"';
  }
  el += '>';
  el += img(args.src, args.alt, style);
  el += '</div>';

  if (args.alt && args.alt.length > 0) {
    el += '<div class="image-meta">';
    if (args.download && args.download.length > 0) {
      el += '<span class="image-caption left">' + args.alt + '</span>';
      let href = args.download;
      if (args.download == 'true') {
        href = args.src;
      }
      el += '<a class="image-download" href="' + href + '"><svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3734"><path d="M561.00682908 685.55838913a111.03077546 111.03077546 0 0 1-106.8895062 0L256.23182837 487.72885783a55.96309219 55.96309219 0 0 1 79.13181253-79.18777574L450.70357448 523.88101491V181.55477937a55.96309219 55.96309219 0 0 1 111.92618438 0v344.06109173l117.07478902-117.07478901a55.96309219 55.96309219 0 0 1 79.13181252 79.18777574zM282.81429711 797.1487951h447.70473912a55.96309219 55.96309219 0 0 1 0 111.92618438H282.81429711a55.96309219 55.96309219 0 0 1 0-111.92618438z" p-id="3735"></path></svg></a>';
    } else {
      el += '<span class="image-caption center">' + args.alt + '</span>';
    }
    el += '</div>';
  }

  el += '</div>';
  return el;
});
