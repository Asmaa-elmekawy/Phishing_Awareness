import os

def fix_analytics():
    path = r'd:\projectss\phishing-awarrness\src\pages\website\Analytics.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Import
    content = content.replace("import { Link as RouterLink } from 'react-router-dom';", 
                              "import { motion as Motion } from 'framer-motion';\nimport { Link as RouterLink } from 'react-router-dom';")
    
    # 2. Header
    content = content.replace('<header className="h-20 border-b border-slate-800/60', 
                              '<Motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-20 border-b border-slate-800/60')
    content = content.replace('</header>', '</Motion.header>')
    
    # 3. Left Panel
    content = content.replace('<div className="flex-[3] p-8 lg:border-r border-slate-800/60 bg-[#0B1120]">', 
                              '<Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-[3] p-8 lg:border-r border-slate-800/60 bg-[#0B1120]">')
    
    # 4. Right Panel
    content = content.replace('<div className="flex-[2] bg-[#0F1523] flex flex-col relative min-w-[380px] max-w-[500px]">', 
                              '<Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex-[2] bg-[#0F1523] flex flex-col relative min-w-[380px] max-w-[500px]">')
    
    # 5. Fix closing tags for Left and Right Panels
    # The left panel ends right before the right panel starts
    # Original:
    #                 </div>
    # 
    #                 {/* Right Panel: Analysis & Breakdown */}
    content = content.replace('                </div>\n\n                {/* Right Panel: Analysis & Breakdown */}',
                              '                </Motion.div>\n\n                {/* Right Panel: Analysis & Breakdown */}')
    content = content.replace('                </div>\r\n\r\n                {/* Right Panel: Analysis & Breakdown */}',
                              '                </Motion.div>\r\n\r\n                {/* Right Panel: Analysis & Breakdown */}')
                              
    # The right panel ends right before the file ends
    # Original:
    #                 </div>
    # 
    #             </div>
    #         </>
    content = content.replace('                </div>\n\n            </div>\n        </>',
                              '                </Motion.div>\n\n            </div>\n        </>')
    content = content.replace('                </div>\r\n\r\n            </div>\r\n        </>',
                              '                </Motion.div>\r\n\r\n            </div>\r\n        </>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_simulations():
    path = r'd:\projectss\phishing-awarrness\src\pages\website\Simulations.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Import
    content = content.replace("import { Link as RouterLink } from 'react-router-dom';", 
                              "import { motion as Motion } from 'framer-motion';\nimport { Link as RouterLink } from 'react-router-dom';")

    # 2. Header
    content = content.replace('<header className="h-20 border-b border-slate-800/60', 
                              '<Motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-20 border-b border-slate-800/60')
    content = content.replace('</header>', '</Motion.header>')

    # 3. Left Panel
    content = content.replace('<div className="flex-1 p-8 lg:border-r border-slate-800/60 flex flex-col">', 
                              '<Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex-1 p-8 lg:border-r border-slate-800/60 flex flex-col">')
                              
    # 4. Right Panel
    content = content.replace('<div className="w-full lg:w-[400px] bg-[#0F1523] flex flex-col lg:border-l border-t lg:border-t-0 border-slate-800/60 flex-shrink-0 lg:flex-shrink">', 
                              '<Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-full lg:w-[400px] bg-[#0F1523] flex flex-col lg:border-l border-t lg:border-t-0 border-slate-800/60 flex-shrink-0 lg:flex-shrink">')

    # 5. Fix closing tags for Left and Right Panels
    # Left panel closing
    content = content.replace('                        </section>\n\n                    </div>\n\n                    {/* Right Live Preview Panel */}',
                              '                        </section>\n\n                    </Motion.div>\n\n                    {/* Right Live Preview Panel */}')
    content = content.replace('                        </section>\r\n\r\n                    </div>\r\n\r\n                    {/* Right Live Preview Panel */}',
                              '                        </section>\r\n\r\n                    </Motion.div>\r\n\r\n                    {/* Right Live Preview Panel */}')

    # Right panel closing
    content = content.replace('                        </div>\n\n                    </div>\n                </div>\n        </>',
                              '                        </div>\n\n                    </Motion.div>\n                </div>\n        </>')
    content = content.replace('                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n        </>',
                              '                        </div>\r\n\r\n                    </Motion.div>\r\n                </div>\r\n        </>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_analytics()
fix_simulations()
