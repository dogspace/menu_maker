
from . import *
from app import app
from app.routes.default_session import DEFAULT_SESSION
from flask import render_template, send_from_directory, session, request, json


# @app.errorhandler(404)
# @app.errorhandler(500)
# def not_found_error(error):
#     print(f"\n>>>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<<<<<\n{error}\n")
#     return render_template('error.html', error=error)


@app.route('/app/styles/<path:name>')
def css_path(name):
    '''Returns requested CSS file from /app/styles/'''
    return send_from_directory('styles', name)


@app.route('/app/scripts/<path:name>')
def js_path(name):
    '''Returns requested JS file from /app/scripts/'''
    return send_from_directory('scripts', name)


@app.route('/', methods = ['GET', 'POST'])
@app.route('/index', methods = ['GET', 'POST'])
def index():
    if request.method == 'GET':
        print(">>>>>>>>>>>>>> /GET <<<<<<<<<<<<<<<<<<")
        new_session = False
        for key in DEFAULT_SESSION.keys():
            if key not in session or new_session:
                print("\n!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!!\n")
                session.clear()
                for key in DEFAULT_SESSION.keys():
                    session[key] = DEFAULT_SESSION[key]
                break
        session.modified = True
        return render_template('index.html', sesssion=session)
        
    if request.method == 'POST':
        print(">>>>>>>>>>>>>> /POST <<<<<<<<<<<<<<<<<<")
        session['names'] = json.loads(request.values.get('names'))
        session['tables'] = json.loads(request.values.get('tables'))
        session['menu'] = json.loads(request.values.get('menu'))
        session['settings'] = json.loads(request.values.get('settings'))
        session.modified = True
        return ''


if __name__ == "__main__":
  app.run(debug=True)

