#!/usr/bin/python
# -*- coding: utf-8 -*-
from random import randint
from typing import Dict


def get_sensors():
    tmp = temperature()
    hum = humidity()
    noi = sound()
    bri = light()
    mov = motion()
    return {
        "temp": tmp.get(),
        "humid": hum.get(),
        "noise": noi.get(),
        "bright": bri.get(),
        "movement": mov.get(),
    }


class temperature():
    def get(self) -> int:
        value = randint(19, 22)
        return value


class humidity():
    def get(self) -> int:
        value = randint(30, 60)
        return value


class light():
    def get(self) -> int:
        value = randint(0, 100)
        return value


class sound():
    def get(self) -> int:
        value = randint(20, 80)
        return value


class motion():
    def get(self) -> bool:
        value = randint(0, 1)
        return value == 1


class red():
    def put(self, id: int) -> Dict[str, int]:
        print("Color rojo:"+str(id))
        return {'red': id}


class green():
    def put(self, id) -> Dict[str, int]:
        print("Color verde:"+str(id))
        return {'green': id}


class blue():
    def put(self, id) -> Dict[str, int]:
        print("Color azul:"+str(id))
        return {'blue': id}
