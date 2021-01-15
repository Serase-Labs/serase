import kivy
kivy.require('1.11.1')

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

class TelaInicial(BoxLayout)
	pass

class Tcc(App):
	def build(self):
		return TelaInicial()
Tcc().run()