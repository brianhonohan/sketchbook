cellGrid = {}
cellWidth = 20

function love.load()
  print('hello')
  print("more info")
  initGrid(cellGrid, cellWidth)
end

function love.draw()
  drawGrid(cellGrid)
end

function love.quit()
  print("Closing")
end

function initGrid(grid, _cellWidth)
  grid.data = {}
  grid.wrap = true
  grid.numRows = math.floor( love.graphics.getHeight() / _cellWidth )
  grid.numCols = math.floor( love.graphics.getWidth() / _cellWidth )
  grid.numCells = grid.numRows * grid.numCols

  for i = 1,grid.numCells do
    grid.data[i] = math.random() > 0.5
  end
end

function drawGrid(grid)
  local x = 0
  local y = 0
  local row = 0
  local col = 0
  local cell

  for i = 1,grid.numCells do
    row = rowForIdx(grid, i)
    col = colForIdx(grid, i)
    cell = grid.data[i]

    if (cell) then
      love.graphics.setColor(0.2, 0.8, 0.2)
    else
      love.graphics.setColor(0.2, 0.2, 0.2)
    end

    x = col * cellWidth
    y = row * cellWidth
    love.graphics.rectangle('fill', x, y, cellWidth, cellWidth)
  end
end

function rowForIdx(grid, idx)
  return math.floor( (idx-1) / grid.numCols )
end

function colForIdx(grid, idx)
  return (idx-1) % grid.numCols
end
