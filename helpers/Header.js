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
            title: "Games - Galhardo APP",
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static books(){
        return {
            title: "Books - Galhardo APP",
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static privacy(){
        return {
            title: "Privacy - Galhardo APP",
            navbar_privacy_active: true
        }
    }

    static projects(){
        return {
            title: "Projects - Galhardo APP",
            navbar_projects_active: true,
            weather_css: `<link rel="stylesheet" href="/css/weather.css">`,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static bank(){
        return {
            title: "Bank - Galhardo APP",
            navbar_bank_active: true,
            app_money_css: `<link rel="stylesheet" href="/css/app_money.css">`,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static toDo(){
        return {
            title: "To Do - Galhardo APP",
            navbar_toDo_active: true,
            todo_css: `<link rel="stylesheet" href="/css/todo.css">`,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static blog(){
        return {
            title: "Blog - Galhardo APP",
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
            scroll_bar_script: `<script src="../scripts/scroll_bar.js"></script>`,
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
            title: "Contact - Galhardo APP",
            navbar_contact_active: true
        }
    }

    static plans(head_title){
        return {
            title: head_title,
            navbar_plans_active: true,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static profile(head_title){
        return {
            title: head_title,
            scroll_bar_div,
            scroll_bar_script
        }
    }

    static shop(){
        return {
            title: "Shop - Galhardo APP",
            navbar_shop_active: true
        }
    }

    static criptoBOT(){
        return {
            title: "Cripto BOT",
            navbar_criptobot_active: true
        }
    }
}

module.exports = Header
