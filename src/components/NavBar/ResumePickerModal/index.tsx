import { useRef, useState } from 'react';
import classNames from 'classnames';
import { useResumeState } from '../../../context/Resume/hook';
import style from './ResumePickerModal.module.scss';

interface Props {
    onClose: () => void;
}

export function ResumePickerModal({ onClose }: Props) {
    const { resumes, activeResumeId, switchResume, createResume, deleteResume, renameResume } =
        useResumeState();

    const [newName, setNewName] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const newNameRef = useRef<HTMLInputElement>(null);

    const handleCreate = () => {
        const name = newName.trim();
        if (!name) return;
        createResume(name);
        setNewName('');
    };

    const handleSwitch = (id: string) => {
        switchResume(id);
        onClose();
    };

    const handleStartRename = (id: string, currentName: string) => {
        setEditingId(id);
        setEditingName(currentName);
    };

    const handleCommitRename = (id: string) => {
        const name = editingName.trim();
        if (name) renameResume(id, name);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        if (resumes.length === 1) return;
        deleteResume(id);
    };

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <div className={style.header}>
                    <span>Resumes</span>
                    <button className={style.closeBtn} onClick={onClose}>
                        <i className="bi bi-x"></i>
                    </button>
                </div>

                <div className={style.list}>
                    {resumes.map((r) => (
                        <div
                            key={r.id}
                            className={classNames(style.row, {
                                [style.active]: r.id === activeResumeId,
                            })}
                        >
                            {editingId === r.id ? (
                                <input
                                    className={style.renameInput}
                                    value={editingName}
                                    autoFocus
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onBlur={() => handleCommitRename(r.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCommitRename(r.id);
                                        if (e.key === 'Escape') setEditingId(null);
                                    }}
                                />
                            ) : (
                                <button
                                    className={classNames(style.nameBtn, 'outlined')}
                                    aria-selected={r.id === activeResumeId}
                                    onClick={() => handleSwitch(r.id)}
                                    onDoubleClick={() => handleStartRename(r.id, r.name)}
                                >
                                    {r.name}
                                </button>
                            )}
                            <div className={style.actions}>
                                <button
                                    className={classNames(style.iconBtn)}
                                    onClick={() => handleStartRename(r.id, r.name)}
                                    title="Rename"
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className={classNames(style.iconBtn, style.danger)}
                                    onClick={() => handleDelete(r.id)}
                                    disabled={resumes.length === 1}
                                    title="Delete"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.createRow}>
                    <input
                        ref={newNameRef}
                        type="text"
                        placeholder="New resume name…"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreate();
                        }}
                    />
                    <button
                        className={classNames('filled', style.addBtn)}
                        style={{
                            backgroundColor: 'var(--color-success)',
                            borderColor: 'var(--color-success)',
                        }}
                        onClick={handleCreate}
                        disabled={!newName.trim()}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
