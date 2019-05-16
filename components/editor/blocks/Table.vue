<template>
  <section class="doc-container">
    <div>
      <button @click.prevent="addRow(rowIndex)">
        Add row above
      </button>
      <button @click.prevent="addRow(rowIndex + 1)">
        Add row below
      </button>
      <button @click.prevent="removeRow(rowIndex)">
        Delete row
      </button>
      <br>
      <button @click.prevent="addCol(colIndex)">
        Add column before
      </button>
      <button @click.prevent="addCol(colIndex + 1)">
        Add column after
      </button>
      <button @click.prevent="removeCol(colIndex)">
        Delete column
      </button>
    </div>
    <table class="doc-resizable-table">
      <thead>
        <tr>
          <th v-for="(header, headerIdx) in headers" :key="headerIdx">
            <div contenteditable="true">
              {{ header }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIdx) in rows" :key="rowIdx">
          <td v-for="(col, colIdx) in row" :key="colIdx">
            <div contenteditable="true" @click.prevent="setIndices(rowIdx, colIdx)">
              {{ col }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
let resizeHandleDiv = null

export default {
  name: 'TableBlock',

  data() {
    return {
      resizeHandleClass: 'resize-handle',
      headers: ['head0', 'head1', 'head2'],
      rows: [
        ['row0 col0', 'row0 col1', 'row0 col2'],
        ['row1 col0', 'row1 col1', 'row1 col2'],
        ['row2 col0', 'row2 col1', 'row2 col2']
      ],
      rowIndex: 0,
      colIndex: 0
    }
  },

  mounted() {
    const tables = document.getElementsByClassName('doc-resizable-table')
    for (let i = 0; i < tables.length; i++) {
      this.resizableTable(tables[i])
    }
  },

  beforeDestroy() {
    if (resizeHandleDiv) {
      resizeHandleDiv.removeEventListener('mousedown', function () {
        console.log('mousedown event removed')
      })
    }
    document.removeEventListener('mousemove', function () {
      console.log('mousemove event removed')
    })
    document.removeEventListener('mouseup', function () {
      console.log('mouseup event removed')
    })
  },

  methods: {
    resizableTable(table) {
      const row = table.getElementsByTagName('tr')[0]
      const cols = row ? row.children : undefined
      let col

      if (!cols) return

      for (let i = 0; i < cols.length; i++) {
        resizeHandleDiv = this.createDiv(table.offsetHeight)

        col = cols[i]
        if (!col.contains(col.getElementsByClassName(this.resizeHandleClass)[0])) {
          col.appendChild(resizeHandleDiv)
          col.style.position = 'relative'

          this.setListeners(resizeHandleDiv)
        }
      }
    },
    createDiv(height) {
      const div = document.createElement('div')

      div.style.top = 0
      div.style.right = 0
      div.style.width = '5px'
      div.style.position = 'absolute'
      div.style.cursor = 'col-resize'
      div.style.userSelect = 'none'
      div.style.height = height + 'px'
      div.className = this.resizeHandleClass

      return div
    },
    setListeners(div) {
      let pageX, curCol, nxtCol, curColWidth, nxtColWidth

      div.addEventListener('mousedown', function (event) {
        curCol = event.target.parentElement
        nxtCol = curCol.nextElementSibling
        pageX = event.pageX
        curColWidth = curCol.offsetWidth
        if (nxtCol) nxtColWidth = nxtCol.offsetWidth
      })

      document.addEventListener('mousemove', function (event) {
        if (curCol) {
          const diffX = event.pageX - pageX

          if (nxtCol) nxtCol.style.width = (nxtColWidth - diffX) + 'px'

          curCol.style.width = (curColWidth + diffX) + 'px'
        }
      })

      document.addEventListener('mouseup', function (event) {
        curCol = undefined
        nxtCol = undefined
        pageX = undefined
        nxtColWidth = undefined
        curColWidth = undefined
      })
    },
    setIndices(row, col) {
      this.rowIndex = row
      this.colIndex = col
    },
    addRow(position) {
      const newRow = Array(this.headers.length).fill('')

      this.rows.splice(position, 0, newRow)
    },
    removeRow(position) {
      if (!this.rows.length) return

      this.rows.splice(position, 1)

      this.rowIndex = 0
    },
    addCol(position) {
      this.headers.splice(position, 0, '')

      this.rows.forEach(cols => cols.splice(position, 0, ''))
    },
    removeCol(position) {
      this.headers.splice(position, 1)

      this.rows.forEach(cols => cols.splice(position, 1))

      this.colIndex = 0
    }
  }
}
</script>

<style scoped lang="scss">
.doc-container {
  margin: 0 0 40px;
}
</style>
<style lang="scss">
table.doc-resizable-table {
  width: 100%;
  border-collapse: collapse;

  & th {
    background-color: #eaeaea;
  }

  & th div[contenteditable],
  & td div[contenteditable] {
    padding: 5px 15px;
    text-align: left;
    outline: none;
  }
  & table,
  & th,
  & td {
    border: 1px solid #ddd;
  }

  & .resize-handle:hover {
    border-right: 2px solid red;
  }
}
</style>
