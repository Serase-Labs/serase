import * as React from 'react';
import { Text, ScrollView, View, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';

// Achei esse código nesse site ae, como esse arquivo é temporário não tem muito com o que preocupar
// https://medium.com/@oieduardorabelo/react-native-navega%C3%A7%C3%B5es-complexas-com-react-navigation-583a8f5a4a7
const getAvailableRoutes = navigation => {
    let availableRoutes = [];
    if (!navigation) return availableRoutes;

    const parent = navigation.dangerouslyGetParent();
    if (parent) {
        if (parent.router && parent.router.childRouters) {
            // Grab all the routes the parent defines and add it the list
            availableRoutes = [
                ...availableRoutes,
                ...Object.keys(parent.router.childRouters),
            ];
        }

        // Recursively work up the tree until there are none left
        availableRoutes = [...availableRoutes, ...getAvailableRoutes(parent)];
    }

    // De-dupe the list and then remove the current route from the list
    return [...new Set(availableRoutes)].filter(
        route => route !== navigation.state.routeName
    );
};

export default function VisualizacaoGeral({navigation}) {
    let rotas = getAvailableRoutes(navigation);

    return (
        <ScrollView style={tailwind("h-full pt-8")}>
            <Text style={tailwind("text-center text-2xl pt-2")}>Rotas (temporário)</Text>
            {
                rotas.map(rota => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate(rota)} key={rota}>
                            <View style={tailwind('bg-green-500 h-12 w-64 rounded mt-8 self-center py-2')}>
                                <Text style={tailwind('text-center text-white text-xl')}>{rota}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    );
}