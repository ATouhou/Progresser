/**
 * progresser.js v1.1
 *
 * Copyright (c) 2015 Planlodge (http://www.planlodge.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

(function($) {

    'use strict';

    var methods = {

        init: function(options) {

            var defaults = {
                selectedContent: '',
                mySelector: this.selector,
                onBottomAction:	function() {},
                onTopAction:	function() {}
            };

            // default settings
            if (options) {
                $.extend(defaults, options);
            }

            return this.each(function(){


                var winHeight = $(window).height(),
                    docHeight = $(document).height(),
                    progressBar = $(defaults.mySelector),
                    max, value;

                /* Set the max scrollable area */
                if (defaults.selectedContent.length < 1) {
                    max = docHeight - winHeight;
                } else {
                    var contentLength = document.getElementById(defaults.selectedContent).offsetHeight;
                    max = docHeight - winHeight - contentLength;
                }
                progressBar.attr('max', max);

                $(document).on('scroll', function(){
                    value = $(window).scrollTop();
                    progressBar.attr('value', value);

                    if (value == max) {
                        defaults.onBottomAction();
                    }

                    if (value == 0) {
                        defaults.onTopAction();
                    }

                });

                $(window).on('resize', function() {
                    winHeight = $(window).height();
                    docHeight = $(document).height();

                    max = docHeight - winHeight - contentLength;
                    progressBar.attr('max', max);

                    value =  $(window).scrollTop();
                    progressBar.attr('value', value);
                });


            });

        }



    };

    // function method
    $.fn.progresser = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist");
        }
    };


}(jQuery));