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
        <tr v-for="(row, rowIdx) in rows" :id="`${rowIdx}`" :key="rowIdx">
          <td v-for="(col, colIdx) in row" :id="`${rowIdx}-${colIdx}`" :key="colIdx">
            <div contenteditable="true" @click.prevent="setIndices(rowIdx, colIdx)" @blur="updateContent($event, rowIdx, colIdx)" v-html="col" />
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
      headers: ['', '', ''],
      rows: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      rowIndex: 0,
      colIndex: 0
    }
  },

  mounted() {
    this.initResizableTable()
  },

  beforeDestroy() {
    this.destroyListeners()
  },

  methods: {
    initResizableTable() {
      const tables = document.getElementsByClassName('doc-resizable-table')
      for (let i = 0; i < tables.length; i++) {
        this.resizableTable(tables[i])
      }
    },
    resizableTable(table) {
      const row = table.getElementsByTagName('tr')[0]
      const cols = row ? row.children : undefined

      if (!cols) return

      for (let i = 0; i < cols.length; i++) {
        resizeHandleDiv = this.createResizeHandleDiv(table.offsetHeight)

        this.removeResizeHandleDiv(cols[i])

        cols[i].appendChild(resizeHandleDiv)
        cols[i].style.position = 'relative'

        this.setListeners(resizeHandleDiv)
      }
    },
    removeResizeHandleDiv(colNode) {
      const resizeHandlerDiv = colNode.getElementsByClassName(this.resizeHandleClass)

      if (!colNode.contains(resizeHandlerDiv[0])) return

      resizeHandlerDiv[0].parentNode.removeChild(resizeHandlerDiv[0])
    },
    createResizeHandleDiv(height) {
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
      this.destroyListeners()

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
    destroyListeners() {
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
    setIndices(row, col) {
      this.rowIndex = row
      this.colIndex = col
    },
    addRow(position) {
      this.rows.splice(position, 0, Array(this.headers.length).fill(''))

      this.rowIndex = position

      this.$nextTick(() => {
        this.initResizableTable()
      })
    },
    removeRow(position) {
      if (!this.rows.length) return

      this.rows.splice(position, 1)

      this.rowIndex = 0

      this.$nextTick(() => {
        this.initResizableTable()
      })
    },
    addCol(position) {
      this.headers.splice(position, 0, '')

      this.rows.forEach(cols => cols.splice(position, 0, ''))

      this.colIndex = position

      this.$nextTick(() => {
        this.initResizableTable()
      })
    },
    removeCol(position) {
      this.headers.splice(position, 1)

      this.rows.forEach(cols => cols.splice(position, 1))

      this.colIndex = 0

      this.$nextTick(() => {
        this.initResizableTable()
      })
    },
    updateContent(event, row, col) {
      const cols = this.rows[row]
      this.$set(cols, col, this.$sanitize(event.target.innerHTML))
      this.$set(this.rows, row, cols)
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
    border-right: 2px solid #4ad8ac;
  }
}
</style>
