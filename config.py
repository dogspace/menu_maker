
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """ Flask config """
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this-key-is-temporary'
    ADMINS = ['dogspace00@gmail.com']
