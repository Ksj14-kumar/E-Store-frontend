import { initial_register_reducer_type } from "./types/types"
type actionType = {
    type: number,
    payload: string
}
export const Register_Reducer_Handler = (state: initial_register_reducer_type, next: actionType) => {
    console.log({ next })
    switch (next.type) {
        case 1:
            

    }
    return

}