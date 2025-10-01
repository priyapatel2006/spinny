'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Car360Modal({ isOpen, onClose, images360, carName }) {
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotating, setRotating] = useState(false);
  const containerRef = useRef(null);
  const rotateRef = useRef(null);

  const totalFrames = images360.length;

  const startRotation = () => {
    setRotating(true);
    rotateRef.current = setInterval(() => {
      setFrame(prev => (prev + 1) % totalFrames);
    }, 150);
  };

  const stopRotation = () => {
    setRotating(false);
    if (rotateRef.current) {
      clearInterval(rotateRef.current);
      rotateRef.current = null;
    }
  };

  const toggleRotation = () => {
    if (rotating) {
      stopRotation();
    } else {
      startRotation();
    }
  };

  const onMouseDown = (e) => {
    setDragging(true);
    setStartX(e.clientX);
    stopRotation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    const deltaX = e.clientX - startX;
    const sensitivity = 30;
    const frameChange = Math.floor(deltaX / sensitivity);

    if (Math.abs(frameChange) > 0) {
      const newFrame = (frame + frameChange + totalFrames) % totalFrames;
      setFrame(newFrame);
      setStartX(e.clientX);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setFrame(prev => (prev - 1 + totalFrames) % totalFrames);
      } else if (e.key === 'ArrowRight') {
        setFrame(prev => (prev + 1) % totalFrames);
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleRotation();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, totalFrames, rotating]);

  useEffect(() => {
    const globalMouseMove = (e) => onMouseMove(e);
    const globalMouseUp = () => onMouseUp();

    if (dragging) {
      document.addEventListener('mousemove', globalMouseMove);
      document.addEventListener('mouseup', globalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', globalMouseMove);
      document.removeEventListener('mouseup', globalMouseUp);
    };
  }, [dragging, startX, frame]);

  useEffect(() => {
    return () => {
      stopRotation();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 h-screen"
        onClick={onClose}
      />

      <div className="relative w-full h-full max-w-6xl max-h-screen p-4 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative w-full h-full max-h-[70vh] bg-gray-900 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            style={{ userSelect: 'none' }}
          >
            <Image
              src={images360[frame]}
              alt={`${carName} 360° view frame ${frame + 1}`}
              fill
              className="object-contain transition-none"
              draggable={false}
              priority
            />

            <div onClick={onClose} className="absolute cursor-pointer top-4 right-8 bg-black/70 text-white px-4 py-2 rounded-lg">
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
