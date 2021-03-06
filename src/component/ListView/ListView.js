import React from 'react'
import { Image, FlatList, StyleSheet, Text, View, SectionList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getSuo } from '../../asset/js/util'
import { $theme } from '../../asset/js/const'

export default function ListView({ data, section, push, end, flag }) {
  const loading = <ActivityIndicator color={$theme} size={30} style={{ margin: 20 }}></ActivityIndicator>

  if (!data && !section && !flag) return loading
  const item = ({ item }) => (
    <View style={s.wrap}>
      <TouchableOpacity style={s.item} onPress={() => push('Detail', { gv: item.id })}>
        <Image source={{ uri: getSuo(item.content) }} style={s.cover} />
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.time}>{item.time}</Text>
      </TouchableOpacity>
    </View>
  )
  const head = ({ section }) => {
    return (
      <View>
        <Text style={{ textAlign: 'center', lineHeight: 60 }}>{section.title}</Text>
        <FlatList
          data={section.data}
          renderItem={item}
          numColumns={2}
          style={s.list}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          key={{}}
        />
      </View>
    )
  }

  return section ? (
    <SectionList
      renderItem={() => null}
      renderSectionHeader={head}
      sections={section}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      key={{}}
    />
  ) : (
    <FlatList
      data={data}
      renderItem={item}
      numColumns={2}
      style={s.list}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      key={{}}
      onEndReachedThreshold={1}
      onEndReached={end}
      ListFooterComponent={() => !flag && loading}
    />
  )
}

const s = StyleSheet.create({
  wrap: {
    width: '50%'
  },
  item: {
    shadowColor: '#000',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    margin: 10
  },
  cover: {
    width: '100%',
    height: 115,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
    padding: 12,
    paddingBottom: 10,
    height: 60
  },
  time: {
    fontSize: 12,
    color: '#666',
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12
  },
  list: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  }
})
