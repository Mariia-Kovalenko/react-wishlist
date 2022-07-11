const Category = (props) => {
    const {name} = props
    return (
        <option value={name}>{name}</option>
    )
}

export default Category;