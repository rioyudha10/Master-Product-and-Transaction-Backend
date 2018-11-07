function M_role (m_role_data){
    this._id=m_role_data._id
    this.code=m_role_data.code
    this.name=m_role_data.name
    this.description=m_role_data.description
    this.is_delete=m_role_data.is_delete
    this.created_by=m_role_data.created_by
    this.created_date=m_role_data.created_date
    this.update_by=m_role_data.update_by
    this.update_date=m_role_data.update_date
}

M_role.prototype.getData = function(){
    return{
        _id: this._id,
        code: this.code,
        name: this.name,
        description: this.description,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        update_by : this.update_by,
        update_date:this.update_date
    }
}

module.exports = M_role