import { ComponentProps } from "react"

interface ModalCenterProps extends ComponentProps<'div'> {
    children: React.ReactNode
}

function ModalCenter(props: ModalCenterProps) {
    return (
        <div {...props} className="w-full h-full flex flex-col px-9 py-10 gap-10">
            {props.children}
        </div>
    )
}

export default ModalCenter