import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase';
require('firebase/firestore')
import {connect} from 'react-redux'

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //let posts = [];
        if(props.usersFollowingLoaded == props.following.length && props.following.length !== 0){
            /* for (let i = 0; i < props.following.length; i++){
                const user = props.users.find(el => el.uid === props.following[i]);
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            } */

            props.feed.sort(function(x,y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .set({})
    }

    const onDislikePress = (userId, postId) => {
        firebase.firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .delete()
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    //columnWrapperStyle={{justifyContent: 'space-between'}}
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <View style={styles.postHeader}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{uri: item.user.profilePic}}
                                >
                                </Image>
                                <Text style={{fontWeight:'bold', fontSize: 18}}>{item.user.name}</Text>
                            </View>
                            <View style={styles.postBody}>
                                <Text style={{fontSize: 16, fontWeight: '500'}}>{item.caption}</Text>
                                <Text style={{fontSize: 10, fontStyle: 'italic'}}>{new Date(item.creation.seconds * 1000).toLocaleDateString("en-US")}</Text>
                            </View>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                            <View style={styles.actionContainer}>
                                {item.currentUserLike ? 
                                    (
                                        <View style={styles.actionIconContainer}>
                                            <MaterialCommunityIcons name="cards-heart" size={30} onPress={() => onDislikePress(item.user.uid, item.id)}/>
                                        </View>
                                    )
                                :
                                (
                                    <View style={styles.actionIconContainer}>
                                        <MaterialCommunityIcons name="heart-outline" size={30} onPress={() => onLikePress(item.user.uid, item.id)}/>
                                    </View>
                                )
                                }
                                <View style={styles.actionIconContainer}>
                                    <MaterialCommunityIcons name="message-outline" size={30} onPress={() => props.navigation.navigate('Comment', {postId: item.id, uid: item.user.uid})}/>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    image: {
        flex: 1,
        aspectRatio: 1/1,
        margin: 5,
        borderRadius: 10
    },
    containerImage: {
        flex: 1/3,
        marginBottom: 20,
        backgroundColor: '#AAAAAA',
        borderRadius: 15
    },
    actionContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'flex-start'
    },
    postHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    postBody:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 8
    },
    actionIconContainer:{
        marginTop: 4,
        marginLeft:14,
        marginBottom: 20
    },
    profilePicture:{
        width: 60,
        height: 60,
        margin: 8,
        borderRadius: 50,
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed);