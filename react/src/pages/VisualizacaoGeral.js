import * as React from 'react';
import { StatusBar, StyleSheet, Image, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

const headerHeight = StatusBar.currentHeight;

const estilos = {
    itemBalanca: tailwind("flex-1"),
    itemBalancaValor: tailwind("text-white text-lg font-bold"),
    itemBalancaDescricao: tailwind("text-white text-xs"),
    botoesMain: tailwind("bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"),
    botoesMainText: tailwind("text-blue-800 font-bold"),
    botoesMainImg: tailwind("w-6 h-6"),
    movimentacao: tailwind("flex-row mb-4"),
    movimentacaoImg: tailwind("w-6 h-6"),
    movimentacaoTexto: tailwind("text-base flex-grow text-left mx-6 font-bold"),
    movimentacaoValor: tailwind("text-base")
};

const estiloExcecao = StyleSheet.create({
    botao: {
        lineHeight: 68
    },
    container: {
        paddingTop: headerHeight
    }
});

export default function VisualizacaoGeral() {
    const balanca_valores = [
        ["R$500", "NA BALANÇA ATUAL"],
        ["R$2.000", "GUARDADO"],
        ["52%", "DE DÍVIDA PAGA"],
    ];

    const movimentacoes = [
        [true, "Salário", "1234,50"],
        [true, "Salário", "1234,50"],
        [false, "Mercado", "500,00"],
        [false, "Ukulele", "200,00"],
        [true, "Mega Sena", "1.000.000"],
    ];

    const imgDespesa = <Image source={require('../assets/despesa_colorized.png')} style={estilos.movimentacaoImg} />;
    const imgReceita = <Image source={require('../assets/receita_colorized.png')} style={estilos.movimentacaoImg} />;


    return (
        <View style={[tailwind("flex-1"), estiloExcecao.container]}>
            <View style={tailwind("bg-blue-900 text-white p-6")}>
                <Text style={tailwind("text-white text-xl")}>Nome do Usuário</Text>
            </View>
            <View style={tailwind("bg-blue-800 flex-row justify-around p-6")}>
                {
                    balanca_valores.map((valores,i) =>
                        <View style={estilos.itemBalanca} key={i}>
                            <Text style={estilos.itemBalancaValor}>{valores[0]}</Text>
                            <Text style={estilos.itemBalancaDescricao}>{valores[1]}</Text>
                        </View>
                    )
                }
            </View>
            <View>
                <View style={tailwind("flex-row justify-around p-4")}>
                    <View style={estilos.botoesMain}>
                        <Image style={estilos.botoesMainImg} source={require('../assets/receita.png')} />
                        <Text style={estilos.botoesMainText}>Receitas</Text>
                    </View>
                    <View style={estilos.botoesMain}>
                        <Image style={estilos.botoesMainImg} source={require('../assets/despesa.png')} />
                        <Text style={estilos.botoesMainText}>Despesas</Text>
                    </View>
                    <View style={estilos.botoesMain}>
                        <Image style={estilos.botoesMainImg} source={require('../assets/relatorio.png')} />
                        <Text style={estilos.botoesMainText}>Relatórios</Text>
                    </View>
                </View>
                <Text style={tailwind("text-2xl text-center text-center")}>Movimentações Recentes</Text>
                <View style={tailwind("p-8")}>
                    {
                        movimentacoes.map((valores, i) =>
                            <View style={estilos.movimentacao} key={i}>
                                {valores[0] ? imgReceita : imgDespesa}
                                <Text style={estilos.movimentacaoTexto}>{valores[1]}</Text>
                                <Text style={estilos.movimentacaoValor}>{valores[2]}</Text>
                            </View>
                        )
                    }
                </View>
            </View>

            <View style={tailwind("absolute right-0 bottom-0 bg-green-500 w-16 h-16 justify-center items-center rounded-full m-2")}>
                <Text style={[tailwind("text-white text-6xl text-center h-16"), estiloExcecao.botao]}>+</Text>
            </View>
        </View>
    );
}