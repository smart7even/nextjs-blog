import React from "react";
import avatarStyles from './avatar.module.css'

export default function Avatar(props: { image: string, size: number }) {
    return (
        <img src={props.image} className={avatarStyles.avatar} height={props.size} width={props.size}></img>
    )
}