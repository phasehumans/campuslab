import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel, Group, Separator } from 'react-resizable-panels'
import { DEFAULT_CODE } from '@/data/code'
import { DescriptionPanel } from '@/components/problem/DescriptionPanel'
import { SolutionsPanel } from '@/components/problem/SolutionsPanel'
import { TestcasePanel } from '@/components/problem/TestcasePanel'
import { TestResultPanel } from '@/components/problem/TestResultPanel'
import { EditorHeader } from '@/components/problem/EditorHeader'
import { BottomPanelHeader } from '@/components/problem/BottomPanelHeader'
import { BottomPanelFooter } from '@/components/problem/BottomPanelFooter'
import { SolveScreenNavbar } from '@/components/problem/SolveScreenNavbar'
import { CodeEditor } from '@/components/problem/CodeEditor'

export function SolveScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('description')
    const [language, setLanguage] = useState('rust')
    const [code, setCode] = useState(DEFAULT_CODE['rust'])
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)

    const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
    const [activeBottomTab, setActiveBottomTab] = useState('testcase')
    const [copied, setCopied] = useState(false)
    const [activeTestCase, setActiveTestCase] = useState(0)

    const handleLanguageChange = (langId: string) => {
        setLanguage(langId)
        setCode(DEFAULT_CODE[langId])
        setIsLangDropdownOpen(false)
    }

    const handleCopySolution = () => {
        navigator.clipboard.writeText(DEFAULT_CODE[language])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const toggleBottomPanel = (tab: string) => {
        if (bottomPanelOpen && activeBottomTab === tab) {
            setBottomPanelOpen(false)
        } else {
            setBottomPanelOpen(true)
            setActiveBottomTab(tab)
        }
    }

    const handleRun = () => {
        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
    }

    const handleSubmit = () => {
        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
    }

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0A] text-gray-300 font-sans overflow-hidden">
            <SolveScreenNavbar handleRun={handleRun} handleSubmit={handleSubmit} />

            {/* Main Content Split */}
            <div className="flex flex-1 overflow-hidden p-2 bg-[#0A0A0A] gap-2">
                <Group orientation="horizontal" className="flex-1 rounded-lg overflow-hidden">
                    {/* Left Pane - Description */}
                    <Panel
                        defaultSize={40}
                        minSize={30}
                        className="flex flex-col bg-[#1E1E1E] rounded-lg border border-white/5 shadow-lg"
                    >
                        {/* Tabs */}
                        <div className="flex items-center gap-1 bg-[#181818] px-2 pt-2 border-b border-white/5">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors',
                                    activeTab === 'description'
                                        ? 'bg-[#1E1E1E] text-white'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                                )}
                            >
                                <FileText className="h-4 w-4 text-blue-400" /> Description
                            </button>
                            <button
                                onClick={() => setActiveTab('solutions')}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors',
                                    activeTab === 'solutions'
                                        ? 'bg-[#1E1E1E] text-white'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                                )}
                            >
                                <FlaskConical className="h-4 w-4 text-purple-400" /> Solutions
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'description' ? (
                                <DescriptionPanel />
                            ) : (
                                <SolutionsPanel
                                    language={language}
                                    copied={copied}
                                    onCopy={handleCopySolution}
                                />
                            )}
                        </div>
                    </Panel>

                    <Separator className="w-2 bg-transparent hover:bg-white/5 transition-colors cursor-col-resize flex flex-col items-center justify-center gap-1 group mx-1">
                        <div className="h-4 w-1 bg-white/10 rounded-full group-hover:bg-white/40 transition-colors" />
                    </Separator>

                    {/* Right Pane - Code Editor & Test Cases */}
                    <Panel
                        defaultSize={60}
                        minSize={30}
                        className="flex flex-col bg-[#1E1E1E] rounded-lg border border-white/5 shadow-lg overflow-hidden"
                    >
                        <Group orientation="vertical" className="flex-1 w-full h-full">
                            <Panel
                                id="editor-panel"
                                defaultSize={bottomPanelOpen ? 70 : 100}
                                minSize={30}
                                className="flex flex-col"
                            >
                                <EditorHeader
                                    language={language}
                                    isLangDropdownOpen={isLangDropdownOpen}
                                    setIsLangDropdownOpen={setIsLangDropdownOpen}
                                    handleLanguageChange={handleLanguageChange}
                                />

                                {/* Editor Area */}
                                <CodeEditor code={code} setCode={setCode} language={language} />
                            </Panel>

                            {bottomPanelOpen && (
                                <>
                                    <Separator className="h-2 bg-transparent hover:bg-white/5 transition-colors cursor-row-resize flex items-center justify-center group">
                                        <div className="w-4 h-1 bg-white/10 rounded-full group-hover:bg-white/40 transition-colors" />
                                    </Separator>
                                    <Panel
                                        id="testcase-panel"
                                        defaultSize={30}
                                        minSize={20}
                                        className="flex flex-col bg-[#1E1E1E] border-t border-white/5"
                                    >
                                        <BottomPanelHeader
                                            activeBottomTab={activeBottomTab}
                                            setActiveBottomTab={setActiveBottomTab}
                                            setBottomPanelOpen={setBottomPanelOpen}
                                        />
                                        <div className="flex-1 overflow-y-auto p-4 bg-[#1E1E1E]">
                                            {activeBottomTab === 'testcase' ? (
                                                <TestcasePanel
                                                    activeTestCase={activeTestCase}
                                                    setActiveTestCase={setActiveTestCase}
                                                />
                                            ) : (
                                                <TestResultPanel />
                                            )}
                                        </div>
                                    </Panel>
                                </>
                            )}
                        </Group>

                        {/* Editor Footer / Bottom Bar (Only visible when closed) */}
                        {!bottomPanelOpen && (
                            <BottomPanelFooter
                                activeBottomTab={activeBottomTab}
                                bottomPanelOpen={bottomPanelOpen}
                                toggleBottomPanel={toggleBottomPanel}
                                setBottomPanelOpen={setBottomPanelOpen}
                            />
                        )}
                    </Panel>
                </Group>
            </div>
        </div>
    )
}
