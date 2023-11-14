
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """ Flask config """
    SECRET_KEY = os.environ.get('FLASK_KEY_MENU_MAKER')
