# how is it organized
when we run sh sass.sh the sass files in the sass directory are compiled to style.css.

Now the fonts loaded in _fonts.scss are trickier. I imported the .css stylesheets for the font, 
using the code spit by fontsquirrel. But the final .css file would look for the fonts in the current directory. 

This is, stylesheet.css for the font was set up like this src("filename.woff"). But now this files are under 
font/filename.woff. So I edited each stylesheet.css using Vim.

If you want to add a new font, copy the files under "fonts" and change the path to "./fonts/filename.woff". Of course, import the stylesheet.css under sass/_fonts and the path will be analogous to the ones already set therein.
