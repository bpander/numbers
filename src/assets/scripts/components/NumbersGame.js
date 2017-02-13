import Inferno from 'inferno';
import Component from 'inferno-component';
import Console from 'components/Console';
import Draggable from 'components/Draggable';
import Droppable from 'components/Droppable';
import Equation from 'components/Equation';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


export default class NumbersGame extends Component {

  state = {
    isDragging: false,
    dragTarget: null,
    dropTarget: null,
    operandIndex: -1,
  };

  onDragStart = target => this.setState({ isDragging: true, dragTarget: target });

  onDragEnd = () => {
    const { dragTarget, dropTarget, operandIndex } = this.state;
    this.setState({ isDragging: false, dragTarget: null, dropTarget: null });
    if (dropTarget != null) {
      this.props.actions.placeTile(dragTarget, dropTarget, operandIndex);
    }
  };

  onDropEnter = (dropTarget, operandIndex) => this.setState({ dropTarget, operandIndex });

  onDropLeave = () => this.setState({ dropTarget: null });

  render() {
    const { equations, tiles, target } = this.props;
    const { dragTarget, dropTarget, isDragging, operandIndex } = this.state;

    return (
      <div>
        <div className="typ typ--alignCenter">
          <div className="typ typ--uppercase typ--0.75x typ--inception2x">Make this</div>
          <div className="vr vr--1x"></div>
          <div className="aligner aligner--alignCenter">
            <Console message={target} />
          </div>
        </div>

        <div className="vr vr--4x"></div>
        <div className="typ typ--alignCenter typ--uppercase typ--0.75x typ--inception2x">
          With these
        </div>
        <div className="vr vr--2x"></div>

        <ul className="aligner aligner--gutters">
          {tiles.map((tile, i) => {
            const isUsed = equations.some(equation => equation.includes(tile));
            return (
              <li className="aligner__item">
                <Slot value={tile.value}>
                  {(!isUsed) && (
                    <Draggable
                      onDragStart={this.onDragStart.bind(this, tile)}
                      onDragEnd={this.onDragEnd}
                    >
                      {draggable => (
                        <Tile
                          value={tile.value}
                          onMouseDown={draggable.onMouseDown}
                          onTouchStart={draggable.onMouseDown}
                          style={(tile === dragTarget)
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
              </li>
            );
          })}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {equations.map(equation => (
            <li>
              <Equation
                equation={equation}
                dragTarget={dragTarget}
                dropTarget={dropTarget}
                operandIndex={operandIndex}
                isDragging={isDragging}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDropEnter={this.onDropEnter}
                onDropLeave={this.onDropLeave}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
