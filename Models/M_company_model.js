function M_company (m_comp_data){
    this._id=m_comp_data._id
    this.code=m_comp_data.code
    this.name=m_comp_data.name
    this.address=m_comp_data.address
    this.phone=m_comp_data.phone
    this.email=m_comp_data.email
    this.is_delete=m_comp_data.is_delete
    this.created_by=m_comp_data.created_by
    this.created_date=m_comp_data.created_date
    this.update_by=m_comp_data.update_by
    this.update_date=m_comp_data.update_date
}



M_company.prototype.getData = function(){
    return{
        _id: this._id,
        code: this.code,
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        update_by : this.update_by,
        update_date:this.update_date
    }
}


module.exports = M_company
