import React, { useRef } from "react";

interface BoundProps {
  boundTop?: number;
  boundBottom?: number;
  boundRight?: number;
  boundLeft?: number;
}

interface DragEvents {
  onDragStart?: (event: React.MouseEvent | MouseEvent) => any;
  onDragEnd?: (event: React.MouseEvent | MouseEvent) => any;
}

interface DraggableProps extends BoundProps, DragEvents {
  children: JSX.Element;
}

function Draggable(props: DraggableProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    const boxTop = event.currentTarget.getBoundingClientRect().top;
    const boxLeft = event.currentTarget.getBoundingClientRect().left;
    const boxBottom = event.currentTarget.getBoundingClientRect().bottom;
    const boxRight = event.currentTarget.getBoundingClientRect().right;

    const onMoveEvent = (e: MouseEvent) => {
      e.preventDefault();
      if (dragContainerRef.current) {
        const dx =
          e.clientX + boxLeft - event.clientX < props.boundLeft!
            ? props.boundLeft! - boxLeft
            : e.clientX + boxRight - event.clientX > props.boundRight!
            ? props.boundRight! - boxRight
            : e.clientX - event.clientX;
        const dy =
          e.clientY + boxTop - event.clientY < props.boundTop!
            ? props.boundTop! - boxTop
            : e.clientY + boxBottom - event.clientY > props.boundBottom!
            ? props.boundBottom! - boxBottom
            : e.clientY - event.clientY;
        dragContainerRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    document.addEventListener("mousemove", onMoveEvent);
    document.addEventListener(
      "mouseup",
      (e) => {
        document.removeEventListener("mousemove", onMoveEvent);
        e.preventDefault();
        if (dragContainerRef.current) {
          dragContainerRef.current.style.transform = "";
        }
        if (props.onDragEnd) props.onDragEnd(e);
      },
      { once: true }
    );
    if (props.onDragStart) props.onDragStart(event);
  };
  return (
    <div
      ref={dragContainerRef}
      onMouseDown={startDrag}
      style={{ position: "absolute" }}
    >
      {props.children}
    </div>
  );
}

export { Draggable };
