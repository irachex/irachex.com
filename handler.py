#!/usr/bin/env python
# coding: utf-8

import os
import time
import web

urls = (
    "/load", "load",
    "/save", "save",
    "/gallery", "gallery",
    "/(|home|about|work|blog)", "index",
)

def getPath():
    return os.path.dirname(__file__)

def loadFile(filepath):
    try:
        f = open(rootdir + filepath, "r")
        content = f.read()
    except:
        content = ""
    finally:
        f.close()
    return content
    
def saveFile(filepath, content):
    f = open(rootdir + filepath, "w")
    f.write(content)
    f.close()


class index:
    def GET(self, page):
        if page:
            return web.template.frender(rootdir + "/templates/%s.html" % (page))()
        return web.template.frender(rootdir + "/templates/index.html")()
        
class gallery:
    def GET(self):
        return render.gallery()

class load:
    def GET(self):
        filename = loadFile("/home.txt")
        content = loadFile("/gallery/" + filename)
        return content

class save:
    def POST(self):
        data = web.data()
        filename = time.strftime("%Y%m%d%H%M%S",time.localtime(time.time())) + ".txt"
        try:
            saveFile("/gallery/"+filename, data)
            saveFile("/home.txt", filename)
            return "ok"
        except:
            return "fail"


rootdir = getPath()

web.webapi.internalerror = web.debugerror 

app = web.application(urls, globals())
main = app.wsgifunc()


if __name__ == "__main__":
    app.run()