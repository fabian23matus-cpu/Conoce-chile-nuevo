import React, { useMemo, useState } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Image, Linking, StatusBar
} from 'react-native';

const regions = [
  { id:'arica', name:'Arica y Parinacota', zone:'Norte', emoji:'🌵', description:'Altiplano, cultura andina y paisajes del desierto.', places:['Lago Chungará','Parque Nacional Lauca','Morro de Arica'], image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000' },
  { id:'tarapaca', name:'Tarapacá', zone:'Norte', emoji:'🏜️', description:'Historia salitrera, playas y oasis en el desierto.', places:['Oficina Salitrera Humberstone','Iquique','Oasis de Pica'], image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000' },
  { id:'antofagasta', name:'Antofagasta', zone:'Norte', emoji:'🌌', description:'El desierto de Atacama, salares y cielos extraordinarios.', places:['San Pedro de Atacama','Valle de la Luna','Salar de Atacama'], image:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000' },
  { id:'atacama', name:'Atacama', zone:'Norte', emoji:'🌸', description:'Desierto florido, costa y valles del norte chico.', places:['Parque Nacional Pan de Azúcar','Bahía Inglesa','Desierto Florido'], image:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000' },
  { id:'coquimbo', name:'Coquimbo', zone:'Norte', emoji:'🌊', description:'Playas, observatorios astronómicos y valles.', places:['Valle del Elqui','La Serena','Punta de Choros'], image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000' },
  { id:'valparaiso', name:'Valparaíso', zone:'Centro', emoji:'🎨', description:'Patrimonio, cerros coloridos, puertos y viñedos.', places:['Valparaíso','Isla de Pascua (Rapa Nui)','Viña del Mar'], image:'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1000' },
  { id:'metropolitana', name:'Región Metropolitana', zone:'Centro', emoji:'🏙️', description:'La capital, museos, barrios históricos y cordillera.', places:['Santiago','Cajón del Maipo','Cerro San Cristóbal'], image:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000' },
  { id:'ohiggins', name:'Libertador General Bernardo O’Higgins', zone:'Centro', emoji:'🍇', description:'Tradiciones huasas, viñedos y paisajes rurales.', places:['Pichilemu','Valle de Colchagua','Parque Nacional Río de los Cipreses'], image:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1000' },
  { id:'maule', name:'Maule', zone:'Centro', emoji:'🌳', description:'Ríos, costa, termas y rutas del vino.', places:['Reserva Nacional Altos de Lircay','Constitución','Lago Colbún'], image:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000' },
  { id:'nuble', name:'Ñuble', zone:'Centro', emoji:'🏞️', description:'Montañas, termas, valles y cultura campesina.', places:['Termas de Chillán','Valle Las Trancas','Cobquecura'], image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000' },
  { id:'biobio', name:'Biobío', zone:'Sur', emoji:'🌲', description:'Bosques, ríos, lagunas y patrimonio industrial.', places:['Saltos del Laja','Parque Nacional Laguna del Laja','Concepción'], image:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000' },
  { id:'araucania', name:'La Araucanía', zone:'Sur', emoji:'🌋', description:'Volcanes, lagos, parques nacionales y cultura mapuche.', places:['Pucón','Parque Nacional Conguillío','Lago Villarrica'], image:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1000' },
  { id:'rios', name:'Los Ríos', zone:'Sur', emoji:'💧', description:'Selva valdiviana, ríos, lagos y cervecería local.', places:['Valdivia','Reserva Biológica Huilo Huilo','Lago Ranco'], image:'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1000' },
  { id:'lagos', name:'Los Lagos', zone:'Sur', emoji:'🏔️', description:'Volcanes, lagos, archipiélagos y fiordos.', places:['Chiloé','Puerto Varas','Parque Nacional Vicente Pérez Rosales'], image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000' },
  { id:'aysen', name:'Aysén', zone:'Austral', emoji:'🧊', description:'Patagonia, ríos turquesa, glaciares y Carretera Austral.', places:['Capillas de Mármol','Parque Nacional Queulat','Cerro Castillo'], image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000' },
  { id:'magallanes', name:'Magallanes y de la Antártica Chilena', zone:'Austral', emoji:'🐧', description:'Patagonia austral, estepas, glaciares y fauna.', places:['Torres del Paine','Punta Arenas','Estrecho de Magallanes'], image:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1000' }
];

const copy = {
  es:{tag:'DESCUBRE EL FIN DEL MUNDO', title:'Chile te espera', subtitle:'De los desiertos del norte a los glaciares de la Patagonia.', search:'Buscar región o destino...', regions:'Explora las 16 regiones', all:'Todas', north:'Norte', center:'Centro', south:'Sur', austral:'Austral', destinations:'Lugares destacados', map:'Ver en el mapa', back:'Volver', detail:'Conoce esta región', footer:'Una aventura de norte a sur · Chile'},
  en:{tag:'DISCOVER THE END OF THE WORLD', title:'Chile is waiting', subtitle:'From northern deserts to the glaciers of Patagonia.', search:'Search region or destination...', regions:'Explore all 16 regions', all:'All', north:'North', center:'Central', south:'South', austral:'Austral', destinations:'Featured places', map:'View on map', back:'Back', detail:'Discover this region', footer:'An adventure from north to south · Chile'},
  pt:{tag:'DESCUBRA O FIM DO MUNDO', title:'O Chile espera por você', subtitle:'Dos desertos do norte às geleiras da Patagônia.', search:'Buscar região ou destino...', regions:'Explore as 16 regiões', all:'Todas', north:'Norte', center:'Centro', south:'Sul', austral:'Austral', destinations:'Lugares em destaque', map:'Ver no mapa', back:'Voltar', detail:'Conheça esta região', footer:'Uma aventura de norte a sul · Chile'},
  fr:{tag:'DÉCOUVREZ LE BOUT DU MONDE', title:'Le Chili vous attend', subtitle:'Des déserts du nord aux glaciers de Patagonie.', search:'Rechercher une région ou destination...', regions:'Explorez les 16 régions', all:'Toutes', north:'Nord', center:'Centre', south:'Sud', austral:'Austral', destinations:'Lieux à découvrir', map:'Voir sur la carte', back:'Retour', detail:'Découvrez cette région', footer:'Une aventure du nord au sud · Chili'}
};

export default function App() {
  const [lang, setLang] = useState('es');
  const [query, setQuery] = useState('');
  const [zone, setZone] = useState('all');
  const [selected, setSelected] = useState(null);
  const t = copy[lang];

  const visible = useMemo(() => regions.filter(r => {
    const matchesZone = zone === 'all' || r.zone.toLowerCase() === zone;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [r.name, r.description, ...r.places].join(' ').toLowerCase().includes(q);
    return matchesZone && matchesQuery;
  }), [zone, query]);

  const openMap = (place) => {
    const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place + ', Chile');
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08283F" />
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.topline}>
            <Text style={styles.brand}>🇨🇱 CONOCE CHILE</Text>
            <View style={styles.langs}>
              {[['es','ES'],['en','EN'],['pt','PT'],['fr','FR']].map(([key,label]) =>
                <TouchableOpacity key={key} onPress={() => setLang(key)} style={[styles.lang, lang===key && styles.langOn]}>
                  <Text style={[styles.langText, lang===key && styles.langTextOn]}>{label}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.tag}>{t.tag}</Text>
          <Text style={styles.heroTitle}>{t.title}</Text>
          <Text style={styles.heroSubtitle}>{t.subtitle}</Text>
          <View style={styles.heroPills}><Text style={styles.pillText}>🏜️ Desierto</Text><Text style={styles.pillText}>🌊 Costa</Text><Text style={styles.pillText}>🏔️ Patagonia</Text></View>
        </View>

        <View style={styles.content}>
          {selected ? (
            <>
              <TouchableOpacity onPress={() => setSelected(null)} style={styles.back}><Text style={styles.backLabel}>‹ {t.back}</Text></TouchableOpacity>
              <Image source={{uri:selected.image}} style={styles.detailImage} />
              <Text style={styles.detailTitle}>{selected.emoji} {selected.name}</Text>
              <Text style={styles.description}>{selected.description}</Text>
              <Text style={styles.sectionTitle}>{t.destinations}</Text>
              {selected.places.map(place => (
                <TouchableOpacity key={place} style={styles.placeRow} onPress={() => openMap(place)}>
                  <Text style={styles.placeText}>📍 {place}</Text><Text style={styles.mapLink}>{t.map} ↗</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <TextInput value={query} onChangeText={setQuery} placeholder={t.search} placeholderTextColor="#80909B" style={styles.search} />
              <Text style={styles.sectionTitle}>{t.regions}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                {[['all',t.all],['norte',t.north],['centro',t.center],['sur',t.south],['austral',t.austral]].map(([key,label]) =>
                  <TouchableOpacity key={key} onPress={() => setZone(key)} style={[styles.filter, zone===key && styles.filterOn]}>
                    <Text style={[styles.filterText, zone===key && styles.filterTextOn]}>{label}</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
              <View style={styles.grid}>
                {visible.map(region => (
                  <TouchableOpacity key={region.id} style={styles.card} onPress={() => setSelected(region)} activeOpacity={0.88}>
                    <Image source={{uri:region.image}} style={styles.cardImage} />
                    <View style={styles.cardBody}>
                      <Text style={styles.zoneLabel}>{region.zone.toUpperCase()} DE CHILE</Text>
                      <Text style={styles.cardTitle}>{region.emoji} {region.name}</Text>
                      <Text style={styles.cardDescription} numberOfLines={2}>{region.description}</Text>
                      <Text style={styles.discover}>DESCUBRIR REGIÓN →</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {visible.length===0 && <Text style={styles.empty}>No encontramos resultados. Prueba otra búsqueda.</Text>}
            </>
          )}
          <Text style={styles.footer}>{t.footer}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#08283F'}, page:{flex:1,backgroundColor:'#F3F6F5'},
  hero:{backgroundColor:'#08283F',paddingHorizontal:20,paddingTop:18,paddingBottom:30,borderBottomLeftRadius:26,borderBottomRightRadius:26},
  topline:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10},
  brand:{color:'#FFFFFF',fontSize:18,fontWeight:'900',letterSpacing:1},
  langs:{flexDirection:'row',gap:5},lang:{paddingVertical:7,paddingHorizontal:9,borderRadius:9,backgroundColor:'#173D55'},
  langOn:{backgroundColor:'#E6B64B'},langText:{color:'#FFFFFF',fontSize:11,fontWeight:'800'},langTextOn:{color:'#08283F'},
  tag:{color:'#E6B64B',fontSize:10,fontWeight:'900',letterSpacing:2,marginTop:36},
  heroTitle:{color:'#FFFFFF',fontSize:34,fontWeight:'900',marginTop:9},
  heroSubtitle:{color:'#D5E2E8',fontSize:15,lineHeight:23,marginTop:8,maxWidth:330},
  heroPills:{flexDirection:'row',gap:9,marginTop:22,flexWrap:'wrap'},pillText:{color:'#FFFFFF',backgroundColor:'#173D55',paddingVertical:8,paddingHorizontal:12,borderRadius:18,fontSize:12,fontWeight:'700'},
  content:{padding:18},search:{backgroundColor:'#FFFFFF',borderRadius:14,paddingHorizontal:16,paddingVertical:14,fontSize:14,color:'#173247',borderWidth:1,borderColor:'#E2E9E8',marginBottom:23},
  sectionTitle:{fontSize:21,fontWeight:'900',color:'#102F43',marginBottom:14},filters:{marginBottom:18,flexGrow:0},filter:{paddingVertical:9,paddingHorizontal:15,borderRadius:20,backgroundColor:'#E4EBE9',marginRight:8},
  filterOn:{backgroundColor:'#0B344C'},filterText:{fontSize:12,color:'#365366',fontWeight:'800'},filterTextOn:{color:'#FFFFFF'},
  grid:{gap:15},card:{backgroundColor:'#FFFFFF',borderRadius:18,overflow:'hidden',borderWidth:1,borderColor:'#E5EBE9'},
  cardImage:{width:'100%',height:155,backgroundColor:'#DDE6E3'},cardBody:{padding:15},zoneLabel:{color:'#B1842B',fontSize:9,fontWeight:'900',letterSpacing:1.5},
  cardTitle:{color:'#102F43',fontSize:18,fontWeight:'900',marginTop:6},cardDescription:{color:'#647783',fontSize:13,lineHeight:19,marginTop:6},
  discover:{color:'#0B536A',fontSize:10,fontWeight:'900',letterSpacing:1,marginTop:13},
  footer:{textAlign:'center',color:'#83939A',fontSize:11,marginTop:30,marginBottom:18},
  back:{paddingVertical:8,marginBottom:12},backLabel:{color:'#0B536A',fontWeight:'800',fontSize:15},
  detailImage:{width:'100%',height:210,borderRadius:18,backgroundColor:'#DDE6E3'},detailTitle:{fontSize:25,fontWeight:'900',color:'#102F43',marginTop:18},
  description:{fontSize:15,color:'#607581',lineHeight:23,marginTop:8,marginBottom:22},
  placeRow:{backgroundColor:'#FFFFFF',padding:16,borderRadius:13,marginBottom:9,flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8},
  placeText:{color:'#17384D',fontSize:14,fontWeight:'700',flex:1},mapLink:{color:'#0B6576',fontSize:11,fontWeight:'900'},empty:{color:'#607581',textAlign:'center',padding:24}
});
