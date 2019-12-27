import os
from setuptools import setup

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "ServTelemBack",
    version = "0.0.1",
    author = "Pedro Gomez",
    author_email = "pedro.gomezm@edu.uah.es",
    description = ("A simple backend"),
    license = "AGPL-3.0",
    keywords = "web",
    url = "https://github.com/ZenTauro/telematicos",
    packages = ['ServTelemBack'],
    long_description=read('README.md'),
    classifiers=[
        "Development Status :: 2 - Pre-Alpha",
        "Topic :: Server",
        "License :: OSI Approved :: GNU Affero General Public License v3"
    ],
    install_requires=[
        'flask',
        'urllib3',
        'redis',
        'Authlib',
        'mysql-connector',
    ]
)
