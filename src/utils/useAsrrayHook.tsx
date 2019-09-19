import React,{useState, useCallback, useMemo} from 'react'

//TODO
interface UseArrayActions<T> {
    removeById:(id: T extends {id: string} ? string : number) => void
    
    

}

type UseArray<T=any> = [T[], UseArrayActions<T>]

/**
 * it will return 
 * @param initial 
 */
export function UseArray<T>(initial:T[]):UseArray<T>{
    const [value , setValue] = useState(initial);

    /** remove by index  */
    const removeIndex = useCallback(
        (index) => {
            const cpy = value.slice();
            cpy.slice(index, 1)
            setValue(cpy.slice(index, 1))
        },
        [],
    )

    const pop = useCallback((item)=>{
        setValue(v => v.slice(0, -1))
    },[])

    const removeById = useCallback((id)=> {
        // @ts-ignore
        setValue(v=> v.filter(ob=> ob.id !== id))

    },[])

    const push = useCallback((item)=>{
        setValue(v=> [...v , item])
    },[])
   
    const insertAt = useCallback((item, index)=> {
        const valueCpy = [...value]
        valueCpy.splice(index, 0, item)
        setValue(valueCpy)
    },[])

    const actions = useMemo(() => ({
        setValue,
        removeById,
        add:push,
        removeIndex
    }), [pop, removeById, push, insertAt])
    return [
        value,
        actions
    ]
}