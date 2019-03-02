cellGrid = {}
cellWidth = 5

function love.load()
  print('hello')
  print("more info")
  initGrid(cellGrid, cellWidth)
end

function love.update()
  stepGrid(cellGrid)
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

function stepGrid(grid)
  local newData = {}
  local tmpCount = 0

  for i = 1,grid.numCells do
    tmpCount = countSurrounding(grid, i)
    newData[i] = nextState(grid.data[i], tmpCount)
  end

  grid.data = newData
end

function neighborsForIdx(grid, idx)
  -- optimistically set them (ignoring edge cases)
  local neighbors = {}
  neighbors[1] = idx - grid.numCols - 1
  neighbors[2] = idx - grid.numCols
  neighbors[3] = idx - grid.numCols + 1
  neighbors[4] = idx - 1
  neighbors[5] = idx + 1
  neighbors[6] = idx + grid.numCols - 1
  neighbors[7] = idx + grid.numCols
  neighbors[8] = idx + grid.numCols + 1

  -- check for edge cases

  -- first row
  if (idx < grid.numCols) then
    neighbors[1] = neighbors[1] + grid.numCells
    neighbors[2] = neighbors[2] + grid.numCells
    neighbors[3] = neighbors[3] + grid.numCells
  end

  -- if in left most column
  if (idx % grid.numCols == 0) then
    neighbors[1] = neighbors[1] + grid.numCols
    neighbors[4] = neighbors[4] + grid.numCols
    neighbors[6] = neighbors[6] + grid.numCols
  end

  -- if in right most column
  if (idx % grid.numCols == (grid.numCols - 1)) then
    neighbors[3] = neighbors[3] - grid.numCols
    neighbors[5] = neighbors[5] - grid.numCols
    neighbors[8] = neighbors[8] - grid.numCols
  end

  -- if in bottom row
  if ((grid.numCells - idx) <= grid.numCols) then
    neighbors[6] = neighbors[6] - grid.numCells
    neighbors[7] = neighbors[7] - grid.numCells
    neighbors[8] = neighbors[8] - grid.numCells
  end

  return neighbors
end

function countSurrounding(grid, idx)
  local count = 0
  local neighbors = neighborsForIdx(grid, idx)
  local tmpNeighborIdx = 0

  for i=1,8 do
    tmpNeighborIdx = neighbors[i]
    if (grid.data[tmpNeighborIdx]) then
      count = count + 1
    end
  end

  return count
end

function nextState(currentState, count)
  if (currentState == true) then
    if (count < 2) then
      return false
    elseif (count > 3) then
      return false
    else
      return true
    end
  else
    return (count == 3)
  end
end
