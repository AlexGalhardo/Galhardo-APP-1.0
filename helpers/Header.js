/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/Header.js
 */

const scroll_bar_div = `
            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div>`

const scroll_bar_script = `<script src="scripts/scroll_bar.js"></script>`


class Header {
    static games(){
        return {
            title: "RecomendaÊ - Games",
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static books(){
        return {
            title: "RecomendaÊ - Books",
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static privacy(){
        return {
            title: "Termos de Privacidade RecomendaÊ",
            navbar_privacy_active: true
        }
    }

    static blog(){
        return {
            title: "Blog RecomendaÊ",
            navbar_blog_active: true,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static blogPost(blogPostTitle){
        return {
            title: blogPostTitle,
            navbar_blog_active: true,
            scroll_bar_div,
            scroll_bar_script,
            use_disqus: true,
            disqus_comments: `<div id="disqus_thread"></div>
                <script>
                    (function() { // DON'T EDIT BELOW THIS LINE
                    var d = document, s = d.createElement('script');
                    s.src = 'https://galhardo-app.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                    })();
                </script>`,
            disqus_script: `<script id="dsq-count-scr" src="//galhardo-app.disqus.com/count.js" async></script>`,
            share_buttons_script: `<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b07de0e9307065b"></script>`,
            share_buttons_inline: `<div class="addthis_inline_share_toolbox"></div>`
        }
    }

    static contact(){
        return {
            title: "Contato RecomendaÊ",
            navbar_contact_active: true
        }
    }

    static premium(head_title){
        return {
            title: head_title,
            navbar_premium_active: true
        }
    }

    static profile(head_title){
        return {
            title: head_title,
            scroll_bar_div,
            scroll_bar_script
        }
    }
}

module.exports = Header
