import Inferno from 'inferno';
import Draggable from 'components/Draggable';
import Droppable from 'components/Droppable';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


const Operand = props => {
  const {
    value,
    isDragging,
    isDragTarget,
    onDragStart,
    onDragEnd,
    onDropEnter,
    onDropLeave,
    slotClassName,
  } = props;
  return (
    <Droppable
      isDragging={isDragging}
      onDropEnter={onDropEnter}
      onDropLeave={onDropLeave}
    >
      {droppable => (
        <Slot className={slotClassName}>
          {(value != null) && (
            <Draggable
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              {draggable => (
                <Tile
                  value={value}
                  onMouseDown={draggable.onMouseDown}
                  onTouchStart={draggable.onMouseDown}
                  style={(isDragTarget)
                    ? {
                      transform: `translate3d(
                        ${draggable.state.left}px,
                        ${draggable.state.top}px,
                        0
                      )`,
                      zIndex: 1,
                    }
                    : null
                  }
                />
              )}
            </Draggable>
          )}
        </Slot>
      )}
    </Droppable>
  );
};

export default function Equation(props) {
  const {
    equation,
    dragTarget,
    dropTarget,
    isDragging,
    onDragStart,
    onDragEnd,
    onDropEnter,
    onDropLeave,
    operandIndex,
  } = props;
  const [ tileA, tileB, operator ] = equation;
  const slotClassName = (isDragging) ? 'slot--receptive' : '';

  return (
    <ul className="aligner aligner--gutters">
      <li className="aligner__item"></li>
      <li className="aligner__item">
        <Operand
          value={(tileA != null) ? tileA.value : null}
          slotClassName={(dropTarget === equation && operandIndex === 0)
            ? 'slot--receiving'
            : slotClassName}
          isDragging={isDragging}
          isDragTarget={dragTarget === tileA}
          onDragStart={onDragStart.bind(null, tileA)}
          onDragEnd={onDragEnd}
          onDropEnter={onDropEnter.bind(null, equation, 0)}
          onDropLeave={onDropLeave}
        />
      </li>
      <li className="aligner__item">{operator}</li>
      <li className="aligner__item">
        <Operand
          value={(tileB != null) ? tileB.value : null}
          slotClassName={(dropTarget === equation && operandIndex === 1)
            ? 'slot--receiving'
            : slotClassName}
          isDragging={isDragging}
          isDragTarget={dragTarget === tileB}
          onDragStart={onDragStart.bind(null, tileB)}
          onDragEnd={onDragEnd}
          onDropEnter={onDropEnter.bind(null, equation, 1)}
          onDropLeave={onDropLeave}
        />
      </li>
      <li className="aligner__item">=</li>
      <li className="aligner__item"></li>
    </ul>
  );
};
