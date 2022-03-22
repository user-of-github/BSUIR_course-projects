import {ButtonStrokeType, ButtonType} from './Button'
import Style from './Button.module.css'


export const getClassesStringForButton = (type: ButtonType = ButtonType.BUTTON_PRIMARY,
                                          stroke: ButtonStrokeType = ButtonStrokeType.BUTTON_STROKE): string => {
    let response: string = Style.button

    response += stroke === ButtonStrokeType.BUTTON_NO_STROKE ? '' : ' ' + Style.buttonStroke
    response += ' '
    response += type === ButtonType.BUTTON_ANTI_PRIMARY
        ? Style.antiPrimary :
        type === ButtonType.BUTTON_PRIMARY
            ? Style.primary : `${Style.primary} ${Style.filled}`

    return response
}