import React from "react";
import {
    Animated,
    View,
    TouchableOpacity
} from "react-native";

import tailwind from "tailwind-rn";


const estilos = {
    checkbox: tailwind("rounded-full border-gray-400 w-5 h-5 mr-3"),
    checkbox_check: tailwind("border-green-400"),
    containerInput: tailwind("w-64"),
};

const borda_tamanho = 1;
const borda_check = 4;
const tempo_animacao = 200;

export class Checkbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selecionado: false,
            fadeAnim: new Animated.Value(borda_tamanho)
        };
    }

    get valor(){
        return this.props.valor;
    }

    deselecionar(){
        this.setState({
            selecionado: false
        });

        this._fadeOut();

        if (this.props.onChange)
            this.props.onChange(false);
    }

    selecionar(){
        this.setState({
            selecionado: true
        });

        this._fadeIn();

        if (this.props.onChange)
            this.props.onChange(true);
    }

    handlerSelecionar(){
        if (this.state.selecionado){
            this.deselecionar();
        }
        else{
            this.selecionar();
        }

        if (this.props.controller)
            this.props.controller.handlerSelecionado(this);
    }

    renderChildren() {
        // Não queria ter que clonar os elementos, porém não consegui achar uma solução melhor tendo em vista que não temos acesso direto ao filho
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                checkbox: this
            });
        })
    }

    _fadeIn = () => {
        console.log("aaa");
        Animated.timing(this.state.fadeAnim, {
            toValue: borda_check,
            duration: tempo_animacao
        }).start();
    }

    _fadeOut = () => {
        console.log("bbb");
        Animated.timing(this.state.fadeAnim, {
            toValue: borda_tamanho,
            duration: tempo_animacao
        }).start();
    }

    render() {
        
        let estilo_checkbox_bola = [estilos.checkbox];

        if (this.state.selecionado){
            estilo_checkbox_bola.push(estilos.checkbox_check);
        }

        return (
            <TouchableOpacity activeOpacity={0.5} style={tailwind("flex-row mb-2")} onPress={this.handlerSelecionar.bind(this)}>
                <Animated.View style={[{ borderWidth: this.state.fadeAnim }, estilo_checkbox_bola]} />
                <View style={estilos.containerInput}>
                    {this.renderChildren()}
                </View>
            </TouchableOpacity>
        );
    }
}

export class CheckboxControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selecionado: null,
        };
    }

    get valor(){
        return this.state.selecionado ? this.state.selecionado.valor : null;
    }

    handlerSelecionado(checkbox){
        const callback = this.props.onChange || (() => {});

        if(this.state.selecionado == null){
            this.state.selecionado = checkbox;
            callback(checkbox.valor);
        }
        else if (this.state.selecionado!=checkbox){
            this.state.selecionado.deselecionar();
            this.setState({ selecionado: checkbox});
            callback(checkbox.valor);
        } else {
            this.state.selecionado = null;
            callback(null);
        }
        
    }

    renderChildren(){
        // Não queria ter que clonar os elementos, porém não consegui achar uma solução melhor tendo em vista que não temos acesso direto ao filho
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                controller: this
            });
        })
    }

    render(){
        return (
            <View>
                {this.renderChildren()}
            </View>
        );
    }
}