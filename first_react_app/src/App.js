/** @format */

import React from 'react'
import { Checkbox, Table, Input } from 'antd'
import axios from 'axios'
import 'antd/dist/antd.css'

class App extends React.Component {
  state = {
    hasSku: false,
    attrs: [], //属性列表
    checkedAttrs: [], //已选择属性列表
    subAttrs: {}, // 子属性列表
    checkedSubAttrs: {} // 已选择子属性列表
  }

  handleSkuChange = (e) => {
    let tmp = {}
    if (!e.target.checked) {
      for(let i in this.state.checkedSubAttrs) {
        tmp[i] = []
      }
      this.setState({
        checkedSubAttrs: tmp
      })
    }
    this.setState({
      hasSku: e.target.checked,
      checkedAttrs: [],
    })
  }

  handleAttributeChange = (id, e) => {
    const { checkedAttrs, checkedSubAttrs } = this.state

    if (e.target.checked) {
      if (checkedAttrs.length >= 2) {
        // message('属性选择不能超过2')
        return
      }
      this.setState({
        checkedAttrs: [...checkedAttrs, id]
      })
    } else {
      // console.log('===', id)
      checkedSubAttrs[id] = []
      this.setState({
        checkedAttrs: checkedAttrs.filter((checkedId) => checkedId !== id),
        checkedSubAttrs
      })
    }
  }

  handleSubAttrChange = (_id, _attrValue, _attrNameId, e) => {
    const { checkedSubAttrs } = this.state
    if (e.target.checked) {
      checkedSubAttrs[_attrNameId].push({
        id: _id,
        attrValue: _attrValue
      })
      this.setState({
        checkedSubAttrs
      })
    } else {
      checkedSubAttrs[_attrNameId] = checkedSubAttrs[_attrNameId].filter((item) => item.id !== _id)
      this.setState({
        checkedSubAttrs
      })
    }
  }

  componentDidMount () {
    axios.get('http://apipreview.b2b.admin.jiuhuar.com/product/attribute/names').then((res) => {
      this.setState({attrs: res})
      let tmpObj = {}
      let tmpCheckedObj = {}
      res.map(({id}) => {
        axios.get(`http://apipreview.b2b.admin.jiuhuar.com/product/attribute/values/${id}`).then((res) => {
          tmpObj[id] = res
        })
        tmpCheckedObj[id] = []
      })
      console.log('...', tmpObj)
      this.setState({
        subAttrs: tmpObj,
        checkedSubAttrs: tmpCheckedObj
      })
    })
  }
  render() {
    const { attrs, checkedAttrs, subAttrs, checkedSubAttrs } = this.state
    let columns = [
      {
        title: '商品条形码',
        dataIndex: 'ma',
        width: 100,
        render: (text, record) => <Input />
      },
      {
        title: '建议零售价',
        dataIndex: 'advicePrice',
        width: 100,
        render: (text, record) => <Input />
      }
    ]
    let dataSource = []

    const checkedNum = Object.values(checkedSubAttrs).filter((item) => item.length > 0).length
    const id1 = checkedAttrs[0]
    const id2 = checkedAttrs[1]

    if (!this.state.hasSku) {
      dataSource.push({
        'key': 'nullkey'
      })
    }

    if (checkedAttrs.length !== 0) {
      columns.unshift({
        title: '规格',
        dataIndex: 'sku',
        width: 100
      })
    }

    if (checkedNum === 1) {
      checkedSubAttrs[id1].map((item) => {
        dataSource.push({
          'key': item.id,
          'sku': item.attrValue
        })
      })
    }
    if (checkedNum === 2) {
      checkedSubAttrs[id1].map((item1) => {
        checkedSubAttrs[id2].map((item2) => {
          dataSource.push({
            'key': `${item1.id}${item2.id}`,
            'sku': `${item1.attrValue};${item2.attrValue}`,
          })
        })
      })
    }

    return (
      <div>
        <Checkbox onChange={this.handleSkuChange}>
          是否有商品规格属性
        </Checkbox>
        
        <br/><br/>
        {attrs.map(({attrName, id}) => (
          <Checkbox
            key={id}
            checked={checkedAttrs.indexOf(id) !== -1}
            onChange={this.handleAttributeChange.bind(this, id)} 
            disabled={checkedAttrs.length >= 2 && checkedAttrs.indexOf(id) === -1}
            style={{ display: this.state.hasSku ? 'inline-block' : 'none' }}
          >{attrName}
          </Checkbox>
        ))}

        <br/><br/>
        {checkedAttrs.length > 0 ? 
          checkedAttrs.map((id) => (
            <div key={id}>
              <h3>{attrs[id-1].attrName}</h3>

              {subAttrs[id].map(({attrNameId, attrValue, id}) => (
                <Checkbox
                  key={id}
                  onChange={this.handleSubAttrChange.bind(this, id, attrValue, attrNameId)} 
                >{attrValue}
                </Checkbox>
              ))}
              <br/><br/>
            </div>
          ))
          : null
        }

        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}

export default App
