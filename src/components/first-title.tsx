import { ComponentProps } from "react";

interface FirstTitleProps extends ComponentProps<'h1'> {
    children: string;
}

function FirstTitle(props: FirstTitleProps) {
    return (
        <h1 {...props} className="text-xl md:text-2xl text-center">
            {props.children}
        </h1>
    )
}

export default FirstTitle