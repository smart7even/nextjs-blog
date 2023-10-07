import React from "react";
import avatarStyles from './avatar.module.css'

export default function Avatar(props: { image: string }) {
    return (
        <img src={props.image} className={avatarStyles.avatar} height={128} width={128}></img>
    )
}