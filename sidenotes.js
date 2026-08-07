// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-3.0-or-later
//
// sidenotes.js -- positions each <li> in div.footnotes next to the
// paragraph or blockquote that references it, turning bottom-of-page
// footnotes into margin sidenotes.
//
// Copyright (C) 2026  Your Name
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License (LICENSE, in this same directory) for
// more details.

(function () {
    'use strict';

    function init() {
        var footnoteBlock = document.querySelector('div.footnotes');
        var article = document.getElementById('article');
        if (!footnoteBlock || !article) {
            return; // nothing to do on pages without footnotes
        }

        footnoteBlock.classList.add('footnotes-side');
        article.classList.add('footnotes-processed');

        var items = footnoteBlock.querySelectorAll('li[id]');

        function placeFootnotes() {
            var minTop = 0;
            items.forEach(function (li) {
                var ref = document.querySelector(
                    'a[href="#' + CSS.escape(li.id) + '"]'
                );
                var host = ref && ref.closest('p, blockquote');
                if (!host) {
                    return;
                }
                var top = Math.max(host.offsetTop, minTop);
                li.style.top = top + 'px';
                minTop = top + li.offsetHeight;
            });
        }

        // Debounce so a window drag doesn't recompute layout on every
        // single resize event.
        var resizeTimer = null;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(placeFootnotes, 100);
        });

        placeFootnotes();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
// @license-end
